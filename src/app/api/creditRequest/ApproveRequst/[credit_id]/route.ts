/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/context/getAuthUser";
import userModel from "@/model/userModel";
import creditRequestModel from "@/model/creditRequest";

export async function POST(
    request: NextRequest,
    { params }: any
) {
    try {
        await dbConnect();
        const { credit_id } = params;

        const admin = await getAuthUser(["Admin"]);
        if (admin instanceof NextResponse) return admin;

        const creditEntry = await creditRequestModel.findById(credit_id);
        if (!creditEntry) {
            return NextResponse.json(
                { success: false, message: "Credit entry not found" },
                { status: 404 }
            );
        }

        // Step 2: Find the user associated with the credit
        const user = await userModel.findById(creditEntry.user);
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // Step 3: Add credit back to the user's credit_left
        user.credit_left += creditEntry.noOfCredit; // Adjust this based on actual field name
        await user.save();

        // Step 4: Delete the credit entry
        await creditRequestModel.findByIdAndDelete(credit_id);

        return NextResponse.json(
            { success: true, message: "Credit Approved" },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error in credit revert handler:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
