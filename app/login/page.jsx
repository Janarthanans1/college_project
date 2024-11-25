"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/auth/login", {
                email,
                password,
            });
            if(response.status === 200){
                alert("user logged in successfully")
                router.push('/')
            }
            
            
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={registerData}
                className="w-full max-w-md p-8 bg-white shadow-md rounded-lg"
            >
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    LOGIN
                </h1>

                {/* Email Field */}
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 font-semibold mb-2"
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2`}
                    />
                    
                </div>

                {/* Password Field */}
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 font-semibold mb-2"
                    >
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="**********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2" 
                    />
                   
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Login
                </button>
                <div className="flex justify-center p-5">
                    <p>Need an account ? <Link href="/register" className="text-blue-600 underline">Register</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Register;
