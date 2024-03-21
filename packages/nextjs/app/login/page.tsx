"use client";

import React from "react";
import { useContext } from "react";
import Link from "next/link";
import { Login } from "../../components/app/authentication/Login";
import { AppContext } from "~~/app/context";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

export default function LoginPage() {
  const { isAuth } = useContext(AppContext);
  console.log(isAuth);

  if (isAuth == "yes") {
    return (
      <>
        <div className="z-10 pt-28 pl-6 pr-6">
          <div className="font-medium custom-text-blue text-3xl ">{"You are already logged in."}</div>
          <Link href="/home" className="btn btn-primary mt-3 text-base w-full">
            {"Go Home"}
          </Link>
        </div>
      </>
    );
  }

  if (isAuth == "no") {
    return (
      <>
        <div id="wild-pay-is-not-auth-log-in" className="z-10 pt-28">
          <div className="font-semibold text-3xl mb-5">{"Welcome back"}</div>
          {/* Input */}
          <Login />
        </div>
      </>
    );
  }
}
