/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/context/getAuthUser";
import fileModel from "@/model/document";


export async function GET() {
    try {
        await dbConnect();
        const user = await getAuthUser(["User"]);
        if (user instanceof NextResponse) return user;
        const noOfFiles = await fileModel.countDocuments({ user: user.id });

        return NextResponse.json({success: true, noOfFiles},{status: 200})
    } catch (error: any) {
        console.log("Error in retriving Company Details: " + error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
