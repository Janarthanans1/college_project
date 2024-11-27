import { NextResponse } from "next/server";
import User from "@/app/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "Invalid email or password" }, // Generic message
                { status: 401 }
            );
        }

        // Verify password
        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
            return NextResponse.json(
                { message: "Invalid email or password" }, // Generic message
                { status: 401 }
            );
        }

        // Ensure JWT_KEY is defined
        if (!process.env.JWT_KEY) {
            throw new Error("JWT_KEY is not defined in environment variables");
        }

        // Determine role dynamically
        const role =await password === "admin_tutor" ? "admin" : "viewer";
        console.log(role)

        // Generate token
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role,
        };
        const token = jwt.sign(tokenData, process.env.JWT_KEY, {
            expiresIn: "1d",
        });

        // Set cookie and respond
        const response = NextResponse.json(
            { message: "User logged in successfully",role },
            { status: 200 },
        );
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60,
        });

        return response;
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
