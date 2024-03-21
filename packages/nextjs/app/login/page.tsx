"use client";

import React from "react";
import { useContext } from "react";
import { Login } from "../../components/app/authentication/Login";
import { AppContext } from "~~/app/context";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

export default function LoginPage() {
  const { isAuth } = useContext(AppContext);

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
