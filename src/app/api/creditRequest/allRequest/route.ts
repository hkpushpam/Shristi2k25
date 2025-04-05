/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/context/getAuthUser";
import creditRequestModel from "@/model/creditRequest";
import UserModel from "@/model/userModel";

async function getUserName(_id:any) {
    const user = await UserModel.findById(_id).select("name");
    return user?.name;
}

export async function GET() {
    try {
        await dbConnect();
        const user = await getAuthUser(["User"]);
        if (user instanceof NextResponse) return user;

        const credits = await creditRequestModel
            .find({})
            .lean();

        const formattedDocumentData = credits.map(credit => ({
            _id: credit._id,
            userName: getUserName,
            reason: credit.reason
        }));
        return NextResponse.json({ Documents: formattedDocumentData, success: true }, { status: 200 });
    } catch (error: any) {
        console.log("Error in retriving Company Details: " + error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
