import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request){

    const path = request.nextUrl.pathname
    const isPublic= path === "/login" || path === "/register"
    const token = request.cookies.get("token")?.value
    if(isPublic && token){
        return NextResponse.redirect(new URL("/",request.nextUrl))
    }

    if(!isPublic && !token){
        return NextResponse.redirect(new URL("/login",request.nextUrl))
    }

    return NextResponse.next()
}

export const config={
    matcher:["/","/login","/register","/home","/profile"],
}