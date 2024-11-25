"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()

  

   const logout = async()=>{
    try {
      const resopnse = await axios.get('/api/auth/logout')
      if(resopnse.data.success === true){
        alert("logout successful")
        router.push('/login')
      }
      
    } catch (error) {
      console.error(error)
    }
   }
  return (
   <>
   <h1>HOME PAGE</h1>
   <button type="button" onClick={logout}>Logout</button>
   </>
  );
}
