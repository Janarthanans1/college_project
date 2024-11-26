import { NextResponse } from "next/server"



export async function POST(req){
 const {name,password,dept,email} = await req.json()
 return NextResponse.json({message:"Data resived",status:200})   
}