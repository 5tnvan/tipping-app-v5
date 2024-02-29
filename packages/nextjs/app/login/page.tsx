"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Authentication } from "../../components/app/authentication/Authentication";
import { useAuthentication } from "~~/hooks/app/useAuthentication";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

export default function LoginPage() {
  const router = useRouter();
  const { isAuth } = useAuthentication();

  if (isAuth == "yes") {
    router.push("/profile/view");
  }

  if (isAuth == "no") {
    return (
      <>
        {/* CONTENT */}
        <div className="cont z-10">
          {/* Hero: */}
          <div className="font-semibold text-3xl">Welcome back</div>
          {/* Input */}
          <Authentication type="login" value="Login" linkSignUp="yes" linkLogin="no" />
        </div>
      </>
    );
  }
}
