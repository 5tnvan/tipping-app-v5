"use client";

import React from "react";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Login } from "../../components/app/authentication/Login";
import { signInWithGoogle } from "./actions";
import { AuthContext } from "~~/app/context";

export default function LoginPage() {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated == "no") {
    return (
      <div id="wild-pay-is-not-auth-log-in" className="z-10 pt-28 pl-6 pr-6">
        <div className="font-semibold text-3xl mb-5">{"Welcome back"}</div>
        {/* Input */}
        <Login />
        <div className="flex flex-col gap-3 items-center justify-center my-5">
          <button
            className="px-4 py-2 border flex gap-2 bg-white border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
            onClick={() => signInWithGoogle()}
          >
            <Image
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
              width={10}
              height={10}
            />
            <span>Login with Google</span>
          </button>
        </div>
        <div className="flex flex-col items-center mt-5">
          <div>
            {`Don't have an account? `}
            <Link href="/getstarted" className="link link-secondary">
              Register
            </Link>
          </div>
          <div>
            {`Forgot Password `}
            <Link href="/login/forgotpassword" className="link link-secondary">
              Reset
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
