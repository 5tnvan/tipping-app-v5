"use client";

import React from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const Settings: NextPage = () => {
  return (
    <>
      {/* CONTENT */}
      <div className="cont z-10">
        <h1>My settings</h1>
        <a href="/settings/account">My Account</a>
        <a href="/settings/wallet">My Wallet</a>
        <a href="/settings/balance">My Balance</a>
      </div>
    </>
  );
};

export default Settings;
