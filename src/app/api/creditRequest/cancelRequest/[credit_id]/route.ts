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
        const { credit_id } = await params;

        const user = await getAuthUser(["Admin"]);
        if (user instanceof NextResponse) return user;

        const creditData = await userModel.findByIdAndDelete(credit_id);
        if (!creditData) {
            return Response.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }
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
