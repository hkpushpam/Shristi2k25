/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuthUser } from '@/context/getAuthUser';
import dbConnect from '@/lib/dbConnect';
import companyDetailModel from '@/model/companyModel';
import { newCompanySchema } from '@/schemas/register/newCompanySchema';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const validated = newCompanySchema.safeParse(reqBody);
        if (validated.error) {
            console.log('Error while Verifying Data of New User: ' + validated.error)
            return NextResponse.json({ error: "Error while Verifying Data of New User: " + validated.error }, { status: 500 })
        }
        const validatedData = validated.data

        const user = await getAuthUser(["SuperAdmin"]);
        if (user instanceof NextResponse) return user;

        const existingCompanyByLicenceNumber = await companyDetailModel.findOne({ licence_number: validatedData.licence_number });
        const existingCompanyByName = await companyDetailModel.findOne({ company_name: validatedData.company_name });
        if (existingCompanyByName) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Company Name already exists"
                },
                { status: 400 })
        }
        if (existingCompanyByLicenceNumber) {
            if (existingCompanyByLicenceNumber.isActive) {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'Company Already exists with this Licence Number.'
                    },
                    { status: 400 }
                );
            }
            else {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Company already exists with this Licence Number but is not active."
                    },
                    { status: 400 }
                )
            }
        } else {
            const newCompany = new companyDetailModel({
                company_name: validatedData.company_name,
                licence_number: validatedData.licence_number,
                phone_number: validatedData.phone_number,
                address: validatedData.address,
                max_user: validatedData.max_user,
                max_survey: validatedData.max_survey,
                user_count: 0,
                survey_count: 0,
            });
            const UpdatedCompany = await newCompany.save();
            return NextResponse.json(
                {
                    success: true,
                    company_id: UpdatedCompany._id,
                    message: 'Company registered successfully. Please Create a new Admin for the Company',
                },
                { status: 201 }
            );
        }
    } catch (error: any) {
        console.error('Error registering user:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || 'Error registering user',
            },
            { status: 500 }
        );
    }
}
