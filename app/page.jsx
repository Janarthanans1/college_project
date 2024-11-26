"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  // const router = useRouter();
  // const [username, setUsername] = useState("loading...");
  // const [error, setError] = useState(null);

  // const fetchUserName = async () => {
  //   try {
  //     const response = await axios.get("/api/auth/user", {
  //       withCredentials: true,
  //     });
  //     setUsername(response.data.user?.name || "Unknown User");
  //   } catch (err) {
  //     console.error("Error fetching username:", err);
  //     setError("Failed to fetch user data. Please log in again.");
  //     setUsername(null);
  //   }
  // };

  // // Logout the user
  // const logout = async () => {
  //   try {
  //     const response = await axios.get("/api/auth/logout", {
  //       withCredentials: true,
  //     });
  //     if (response.data.success) {
  //       alert("Logout successful");
  //       router.push("/login"); // Redirect to login page after logout
  //     } else {
  //       alert("Failed to logout");
  //     }
  //   } catch (error) {
  //     console.error("Error during logout:", error);
  //     alert("An error occurred during logout. Please try again.");
  //   }
  // };

  // useEffect(() => {
  //   fetchUserName();
  // }, []);

  return (
    // <div className="p-6">
    //   <h1 className="text-2xl font-bold mb-4">Home Page</h1>

    //   {/* Show error if fetching username fails */}
    //   {error ? (
    //     <div className="text-red-500 mb-4">{error}</div>
    //   ) : (
    //     <p className="text-lg mb-4">Welcome, <strong>{username}</strong>!</p>
    //   )}

    //   <button type="button" onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
    //     Logout
    //   </button>
    // </div>
    <div className="h-full bg-blue-500">
      <nav className="bg-fuchsia-800 h-20"><img src="logo.png" alt="" className="w-20 rounded px-3"/></nav>
      
    </div>
  );
}
