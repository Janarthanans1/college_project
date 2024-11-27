'use client'
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import axios from "axios";
export default function Profile() {

    const router = useRouter();
    const [username, setUsername] = useState("loading...");
    const [role, setRole] = useState("loading...")
    const [error, setError] = useState(null);

    const fetchUserName = async () => {
        try {
            const response = await axios.get("/api/auth/user", {
                withCredentials: true,
            });
            console.log(response);

            setUsername(response.data.user?.name || "Unknown User");
            setRole(response.data.user?.role)
        } catch (err) {
            console.error("Error fetching username:", err);
            setError("Failed to fetch user data. Please log in again.");
            setUsername(null);
        }
    };
    useEffect(() => {
        fetchUserName();
    }, []);

    return(
        <div>
            <h1>Name : {username}</h1>
            <h1>Role : {role}</h1>
            {role === "admin"?<button type="button">add</button>:<button type="button">not</button>}
        </div>
    )

}