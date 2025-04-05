/* eslint-disable @typescript-eslint/no-explicit-any */
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/context/getAuthUser";
import UserModel from "@/model/userModel";


export async function GET() {
    try {
        await dbConnect();
        const user = await getAuthUser(["Admin"]);
        if (user instanceof NextResponse) return user;

        const users = await UserModel
            .find({role: "User"})
            .select("_id email name isActive credit_left -password")
            .lean();

        const formattedCompanyData = users.map(user => ({
            _id: user._id,
            user_name: user.name,
            user_email: user.email,
            user_status: user.isActive ? "Active" : "Inactive",
            user_credit: user.credit_left
        }));
        return NextResponse.json({ Companies: formattedCompanyData, success: true }, { status: 200 });
    } catch (error: any) {
        console.log("Error in retriving Company Details: " + error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
