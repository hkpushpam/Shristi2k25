/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthUser } from '@/context/getAuthUser';
import { updateCompanyData } from '@/context/updateCompanyData';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/userModel';
import bcrypt from 'bcryptjs';
import { newAdminSchema } from '@/schemas/register/newAdminSchema';
import { NextRequest, NextResponse } from 'next/server';
import companyDetailModel from '@/model/companyModel';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const validated = newAdminSchema.safeParse(reqBody);
        if (validated.error) {
            console.log('Error while Verifying Data of New Admin: ' + validated.error)
            return NextResponse.json({ error: "Error while Verifying Data of New Admin: " + validated.error }, { status: 500 })
        }
        const validatedData = validated.data

        const user = await getAuthUser(["SuperAdmin"]);
        if (user instanceof NextResponse) return user;
        const company = await updateCompanyData(validatedData.company, "newUser");
        if (company instanceof NextResponse) return company;

        const existingUserByEmail = await UserModel.findOne({ email: validatedData.email });
        if (existingUserByEmail) {
            if (existingUserByEmail.isActive) {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'User already exists with this email.'
                    },
                    { status: 400 }
                );
            }
            else {
                return NextResponse.json(
                    {
                        success: false,
                        message: "User Already exists with this email but is not active."
                    }
                )
            }
        } else {
            const hashedPassword = await bcrypt.hash(validatedData.password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                email: validatedData.email,
                password: hashedPassword,
                name: validatedData.name,
                mobile: validatedData.mobile,
                company: validatedData.company,
                role: "Admin",
                isActive: true,
                forgotPasswordToken: ' ',
                forgotPasswordTokenExpiry: new Date,
            });
            await newUser.save();
            if (company.canAdd) {
                const admin_count = company.company.admin_count + 1;
                await companyDetailModel.findByIdAndUpdate(company.company._id, {admin_count});
            }
        }
        return NextResponse.json(
            {
                success: true,
                message: 'Admin registered successfully. You can share the login credentials to the admin.',
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error registering Admin:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || 'Error registering Admin',
            },
            { status: 500 }
        );
    }
}
