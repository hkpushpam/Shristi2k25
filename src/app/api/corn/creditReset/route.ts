import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/userModel';
import {NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        const result = await UserModel.updateMany({}, { $set: { credit_left: 20, credit_used:0 } });
        if(result)
            return NextResponse.json({success: true, message: "Resetting Successfull" }, {status: 200})
        else
            return NextResponse.json({success: false, message: "Resetting Failed" }, {status : 500})
    } catch {
        return NextResponse.json({success: false, message: "Resetting Failed" }, {status: 500})
    }
}
