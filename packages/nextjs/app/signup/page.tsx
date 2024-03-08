"use client";

import React from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "~~/app/context";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";
import { Signup } from "~~/components/app/authentication/Signup";

export default function SignUpPage() {
  const router = useRouter();
  const { isLoadingAuth, isAuth, user, profile, refetchAuth } = useContext(AppContext);

  if (isAuth == "yes") {
    router.push("/profile/view");
  }

  if (isAuth == "no") {
    return (
      <>
        {/* CONTENT */}
        <div id="wildpay-is-not-auth-sign-up" className="z-10">
        <div className="font-semibold text-3xl mb-5">{"Create an account"}</div>
          <Signup refetch={refetchAuth} />
        </div>
      </>
    );
  }
}
