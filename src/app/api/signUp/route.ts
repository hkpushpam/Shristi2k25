import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/userModel';
import { signUpSchema } from '@/schemas/signUpSchema';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    console.log("Request recieved");
    await dbConnect();
    try {
        const validate = signUpSchema.safeParse(await request.json());
        if (validate.success) {
            const validatedData = validate.data;
            const existingUserByEmail = await UserModel.findOne({ email: validatedData.email })

            if (existingUserByEmail) {
                if (existingUserByEmail.isActive) {
                    return NextResponse.json(
                        {
                            success: false,
                            message: 'User already exists with this email',
                        },
                        { status: 400 }
                    );
                }
                else {
                    return NextResponse.json(
                        {
                            success: false,
                            message: 'User already exits, but the account is not Active',
                        },
                        { status: 400 }
                    );
                }
            } else {
                const hashedPassword = await bcrypt.hash(validatedData.password, 10);

                const newUser = new UserModel({
                    email: validatedData.email,
                    password: hashedPassword,
                    name: validatedData.name,
                    credit_left: 20,
                    isActive: true,
                    role: 'User',
                    lastLogin: Date.now()
                });

                await newUser.save();
            }

            return Response.json(
                {
                    success: true,
                    message: 'User registered successfully. Please sign in to your account',
                },
                { status: 201 }
            );
        }
        else {
            console.log('Error while Verifying Data of New User: ' + validate.error)
            return NextResponse.json({ error: "Error while Verifying Data of New User: " + validate.error }, { status: 500 })
        }
    } catch (error) {
        console.error('Error registering user:', error);
        return Response.json(
            {
                success: false,
                message: 'Error registering user',
            },
            { status: 500 }
        );
    }
}