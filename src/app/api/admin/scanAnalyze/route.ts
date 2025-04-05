import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import scanModel from "@/model/scan";

export async function GET() {
    try {
        await dbConnect();

        const allScans = await scanModel.find({}).lean();

        const formatted = allScans.map(scan => ({
            name: scan.created_at.toISOString().split("T")[0],
            request: scan.no_of_scans,
        }));

        return NextResponse.json(
            {
                success: true,
                data: formatted,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching scan analysis:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Error fetching scan analysis",
            },
            { status: 500 }
        );
    }
}
