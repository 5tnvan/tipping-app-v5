"use client";

import { useCallback, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { Authentication } from "../../components/app/authentication/Authentication";
import { getUser } from "../profile/actions";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState("init");

  /* SIDE EFFECTS AND CALLBACKS */
  //Check if user is logged in, if yes then initialize profile
  const initUser = useCallback(async () => {
    const data = await getUser();
    if (!data.error) {
      router.push("/profile/view");
    } else {
      setIsLogin("notloggedin");
    }
  }, []);

  React.useEffect(() => {
    initUser();
  }, []);

  if (isLogin == "init") {
    return null;
  }

  if (isLogin == "notloggedin") {
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
