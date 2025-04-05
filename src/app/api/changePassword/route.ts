import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/userModel';
import { changePasswordSchema } from '@/schemas/changePasswordSchema'
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getAuthUser } from '@/context/getAuthUser';

export async function POST(request: Request) {
    try {
        await dbConnect();

        const user = await getAuthUser(["Admin", "User"]);
        if (user instanceof NextResponse) return user;
        const _user = await UserModel.findById({ id: user.id });
        if (!_user) {
            return Response.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        const validated = changePasswordSchema.safeParse(await request.json);
        if (validated.success) {
            const hashedPassword = await bcrypt.hash(validated.data.new_password, 10);
            const validpassword = await bcrypt.compare(validated.data.old_password, _user.password)
            if (validpassword) {
                _user.password = hashedPassword;
                await _user.save();
                return NextResponse.json({ message: 'Password Successfully changed. Sign in to your account.' }, { status: 202 })
            }
            else {
                return NextResponse.json({ message: 'Old password is incorrect.' }, { status: 401 })
            }
        }
        else {
            console.log('Error while Verifying Data of changing Password: ' + validated.error)
            return NextResponse.json({ error: "Error while Verifying Data of New User: " + validated.error }, { status: 500 })
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
