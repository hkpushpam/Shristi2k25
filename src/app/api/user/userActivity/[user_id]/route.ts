/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/context/getAuthUser";
import userModel from "@/model/userModel";


export async function POST(
    request: NextRequest,
    { params }: any
) {
    try {
        await dbConnect();
        const { user_id } = await params;

        const user = await getAuthUser(["SuperAdmin", "Admin"]);
        if (user instanceof NextResponse) return user;

        const userData = await userModel.findById(user_id);
        if (!userData) {
            return Response.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }
        if (user.id == user_id)
            return NextResponse.json(
                { success: false, message: "Can't Change the Active Status of Yourself." },
                { status: 403 }
            )
        userData.isActive = userData.isActive ? false : true;
        await userData.save();
        return NextResponse.json(
            { success: true, message: "Updated the User's activity Successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            { success: false, message: "Something went wrong while updating the Company's Activity" + error },
            { status: 500 }
        );
    }
}
