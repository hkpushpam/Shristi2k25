import { getAuthUser } from '@/context/getAuthUser';
import dbConnect from '@/lib/dbConnect';
import creditRequestModel from '@/model/creditRequest';
import UserModel from '@/model/userModel';
import { requestCreditSchema } from '@/schemas/user/requestCredit';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const user = await getAuthUser(["User"]);
        if (user instanceof NextResponse) return user;

        const validate = requestCreditSchema.safeParse(await request.json);
        if (validate.success) {
            const validatedData = validate.data;
            const existingUserById = await UserModel.findOne({ id: user.id })

            if (existingUserById) {
                    return NextResponse.json(
                        {
                            success: false,
                            message: 'Your Last request was not approve, Please contact the admin',
                        },
                        { status: 400 }
                    );
            } else {
                const newrequest = new creditRequestModel({
                    userId: user.id,
                    number: validatedData.number,
                    reason: validatedData.reason
                });

                await newrequest.save();
                return Response.json(
                    {
                        success: true,
                        message: 'User registered successfully. Please sign in to your account',
                    },
                    { status: 201 }
                );
            }

        }
        else {
            console.log('Error while Verifying Data of Request Credit: ' + validate.error)
            return NextResponse.json({ error: "Error while Verifying Data of Request Credit"}, { status: 500 })
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