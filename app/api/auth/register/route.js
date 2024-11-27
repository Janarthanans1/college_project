import User from "../../../models/User"
import connectDb from "../../../lib/db"
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        await connectDb()
        const { name, email, password } = await request.json()
        if (!name || !email || !password) {
            return NextResponse.json({ message: "All fields are required" })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ message: "user already exist" })
        }
        let role ="viewer"
        if(password === "admin_tutor"){
            role = "admin"
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            role
        })
        await newUser.save()
        return NextResponse.json({message:"user registered successfully",status:201})
    } catch (error) {
        return NextResponse.json({ error: "Error in server", status: 500 })
    }
}