"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { axios } from "axios";

export default function SignUpPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignUp = async () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Sign Up</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-amber-300"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-amber-300"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-amber-300"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className="p-2 w-1/4 border bg-emerald-600 border-gray-300 rounded-lg mb-4 focus:border-amber-400"
        onClick={onSignUp}
      >
        Sign Up
      </button>
      <Link href="/login">Already have an account? Log In</Link>
    </div>
  );
}
