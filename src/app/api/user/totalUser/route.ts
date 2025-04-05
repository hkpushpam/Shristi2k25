/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/context/getAuthUser";
import UserModel from "@/model/userModel";


export async function GET() {
    try {
        await dbConnect();
        const user = await getAuthUser(["User"]);
        if (user instanceof NextResponse) return user;
        const noOfusers = await UserModel.countDocuments();

        return NextResponse.json({success: true, noOfusers},{status: 200})
    } catch (error: any) {
        console.log("Error in retriving Company Details: " + error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
