"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { verify } from "crypto";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      if (response.status === 200) {
        setVerified(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  // Extract token from URL on component mount
  useEffect(() => {
    const tokenUrl = window.location.search.split("=")[1];
    setToken(tokenUrl);
  }, []);

  useEffect(() => {
    if (token?.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <br />
      <h1 className="text-4xl">
        {verified
          ? "Email Verified Successfully!"
          : error
          ? "Verification Failed"
          : "Verifying Email..."}
      </h1>
      <br />
      <h2 className="p-2 bg-amber-700 text-md">
        {token ? token : "No token found"}
      </h2>
      <br />
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified Successfully!</h2>
          <Link href="/login" className="text-blue-500 underline">
            Go to Login
          </Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl text-red-400">Verification Failed</h2>
          <Link href="/login" className="text-blue-500 underline">
            Go to Login
          </Link>
        </div>
      )}
    </div>
  );
}
