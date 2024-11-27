"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function Home() {

  const router = useRouter();
  const [username, setUsername] = useState("loading...");
  const [role,setRole]=useState("loading...")
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

  // Logout the user
  const logout = async () => {
    try {
      const response = await axios.get("/api/auth/logout");
      if (response.data.success) {
        alert("Logout successful");
        router.push("/login"); // Redirect to login page after logout
      } else {
        alert("Failed to logout");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };

  useEffect(() => {
    fetchUserName();
  }, []);

  return (
    <>
      <button type="button" onClick={logout} className="bg-red-500 p-2 hover:cursor-pointer">Logout</button>
    </>

  );
}
