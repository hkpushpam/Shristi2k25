import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function getAuthUser(requiredRole?: string[]) {
    const session = await getServerSession(authOptions);
    const _user = session?.user;
    if (!session || !session.user || _user.id) {
        return NextResponse.json(
            { success: false, message: "Not authenticated" },
            { status: 401 }
        );
    }
    const id = _user._id.toString();
    const role: string = _user.role;
    const company = _user.company.toString();

    if(requiredRole) {
        if(!requiredRole.includes(role))
            return NextResponse.json(
                {success: false, message: "Insufficient Permission"},
                {status: 403},
            );
    }

    return {id, role, company};
}