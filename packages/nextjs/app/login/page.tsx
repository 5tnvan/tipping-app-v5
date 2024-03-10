"use client";

import React from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Login } from "../../components/app/authentication/Login";
import { AppContext } from "~~/app/context";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { isLoadingAuth, isAuth, user, profile, refetchAuth } = useContext(AppContext);

  if (isAuth == "yes") {
    router.push("profile/view");
  }

  if (isAuth == "no") {
    return (
      <>
        {/* ID: wild-pay-is-not-auth-log-in */}
        <div id="wild-pay-is-not-auth-log-in" className="z-10 pt-28">
          <div className="font-semibold text-3xl mb-5">{"Welcome back"}</div>
          {/* Input */}
          <Login refetch={refetchAuth} />
        </div>
      </>
    );
  }
}
