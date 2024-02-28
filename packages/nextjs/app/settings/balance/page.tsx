"use client";

import React from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const SettingsBalance: NextPage = () => {
  const { address } = useAccount();
  return (
    <>
      {/* CONTENT */}
      <div className="cont z-10">{address}</div>
    </>
  );
};

export default SettingsBalance;
