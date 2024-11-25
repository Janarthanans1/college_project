import connectDb from "../../../lib/db"
import User from "../../../models/User"
import { jwtVerify } from "jose"
import { NextResponse } from "next/server"

export async function GET(request) {
    try {
        await connectDb()

        const token = request.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const secret = new TextEncoder().encode(process.env.JWT_KEY);
        const { payload } = await jwtVerify(token, secret);

        const user = await User.findById(payload.id).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        } return NextResponse.json({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}