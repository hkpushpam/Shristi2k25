/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/context/getAuthUser";
import creditRequestModel from "@/model/creditRequest";

async function getUserName(_id:any) {
    
}

export async function GET() {
    try {
        await dbConnect();
        const user = await getAuthUser(["User"]);
        if (user instanceof NextResponse) return user;

        const files = await creditRequestModel
            .find({})
            .lean();

        const formattedDocumentData = files.map(file => ({
            _id: file._id,
            userName: getUserName,
        }));
        return NextResponse.json({ Documents: formattedDocumentData, success: true }, { status: 200 });
    } catch (error: any) {
        console.log("Error in retriving Company Details: " + error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
