"use client";

import React from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "~~/app/context";
import { Signup } from "~~/components/app/authentication/Signup";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

export default function SignUpPage() {
  const router = useRouter();
  const { isAuth } = useContext(AppContext);

  if (isAuth == "yes") {
    router.push("/home");
  }

  if (isAuth == "no") {
    return (
      <>
        {/* CONTENT */}
        <div id="wildpay-is-not-auth-sign-up" className="z-10">
          <div className="font-semibold text-3xl mb-5">{"Create an account"}</div>
          <Signup />
        </div>
      </>
    );
  }
}
