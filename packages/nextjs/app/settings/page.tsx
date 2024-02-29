"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import { useAuthentication } from "~~/hooks/app/useAuthentication";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const Settings: NextPage = () => {
  const router = useRouter();
  const { isAuth, profile } = useAuthentication();

  /* ROUTE */
  if (isAuth == "no") {
    router.push("/login");
  }

  if (isAuth == "yes") {
    return (
      <>
        {/* CONTENT */}
        <div className="cont z-10">
          <div className="text-3xl">My settings</div>
          <a href="/settings/account" className="link">
            My Account
          </a>
          <a href="/settings/wallet" className="link">
            My Wallet
          </a>
          <a href="/settings/balance" className="link">
            My Balance
          </a>
        </div>
      </>
    );
  }
};

export default Settings;
