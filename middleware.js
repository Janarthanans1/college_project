import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

// Middleware function to check access based on user role
export async function middleware(request) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value;

    // Define public routes where any user (even without a token) can access
    const isPublic = path === "/login" || path === "/register";

    // If the route is public and the user is already authenticated, redirect them to the home page
    if (isPublic && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    // If the route is not public and there is no token, redirect to the login page
    if (!isPublic && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    try {
        // If a token exists, verify it
        if (token) {
            const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_KEY));

            // Check the user's role
            const userRole = payload.role;

            // Define routes based on the user's role
            if (userRole === "admin") {
                // Admins can access all routes, including the dashboard
                if (path === "/login" || path === "/register") {
                    return NextResponse.redirect(new URL("/", request.nextUrl));
                }
            } else if (userRole === "viewer") {
                // Viewers are restricted to home, login, and register only
                const restrictedPaths = ["/dashboard"];
                if (restrictedPaths.includes(path)) {
                    return NextResponse.redirect(new URL("/", request.nextUrl));
                }
            }
        }

        // Allow the request to proceed
        return NextResponse.next();
    } catch (error) {
        // In case of token verification error, redirect to login
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

// Define the URL pattern for routes that need to be checked by this middleware
export const config = {
    matcher: ["/", "/login", "/register", "/dashboard", "/home"],
};
