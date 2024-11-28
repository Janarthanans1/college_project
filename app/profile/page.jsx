'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
    const router = useRouter();
    const [username, setUsername] = useState("loading...");
    const [role, setRole] = useState("loading...");
    const [img, setImg] = useState(null); // Default to null
    const [error, setError] = useState(null);

    const fetchUserName = async () => {
        try {
            const response = await axios.get("/api/auth/user", {
                withCredentials: true,
            });
            console.log(response);

            setUsername(response.data.user?.name || "Unknown User");
            setRole(response.data.user?.role);

            // Ensure the img is properly formatted
            const image = response.data.user?.img || null;
            setImg(image?.startsWith("data:image/") ? image : `data:image/jpeg;base64,${image}`);
        } catch (err) {
            console.error("Error fetching username:", err);
            setError("Failed to fetch user data. Please log in again.");
            setUsername(null);
        }
    };

    useEffect(() => {
        fetchUserName();
    }, []);

    return (
        <div>
            <h1>Name: {username}</h1>
            <h1>Role: {role}</h1>
            {img ? (
                <img
                    src={img}
                    alt="User Profile"
                    style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                />
            ) : (
                <p>Loading image...</p>
            )}
            {role === "admin" ? (
                <button type="button">Add</button>
            ) : (
                <button type="button">Not</button>
            )}
        </div>
    );
}
