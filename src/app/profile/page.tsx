"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React, { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  const getUserDetails = async () => {
    const response = await axios.get("/api/users/me");
    setData(response.data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <hr />
      <p>Welcome to your profile!</p>
      <h2>
        {data === "nothing" ? (
          "No data available"
        ) : (
          <Link href={`/profile/${data.user?._id}`}>
            {JSON.stringify(data.user?._id)}
          </Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="p-2 mt-4 w-1/4 border bg-red-600 border-gray-300 rounded-lg mb-4 focus:border-amber-400"
      >
        Log Out
      </button>
      <button
        onClick={getUserDetails}
        className="p-2 mt-4 w-1/4 border bg-blue-600 border-gray-300 rounded-lg mb-4 focus:border-amber-400"
      >
        Get User Details
      </button>
    </div>
  );
}
