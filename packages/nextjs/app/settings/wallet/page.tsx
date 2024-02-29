"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../actions";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth/Address";
import { useAuthenticationWithProfileInit } from "~~/hooks/app/useAuthentication";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

// Component definition
const SettingsWallet: NextPage = () => {
  const { isLogin, profile } = useAuthenticationWithProfileInit();
  const [isWallet, setIsWallet] = useState(false);
  const [isWalletVerified, setIsWalletVerified] = useState(false);
  const [ago, setAgo] = useState("");

  // Function to calculate days ago
  const calculateAgo = () => {
    const currentTimestamp = new Date().getTime();
    const yourTimestampString = profile.wallet_sign_timestamp;
    const yourTimestamp = new Date(yourTimestampString).getTime();

    const timeDifference = currentTimestamp - yourTimestamp;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursAgo = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    setAgo(`${daysAgo} days and ${hoursAgo} hours ago`);
  };

  useEffect(() => {
    if (profile.wallet_id) {
      setIsWallet(true);
    }
    if (profile.wallet_sign_hash) {
      setIsWalletVerified(true);
    }
    calculateAgo();
  }, [profile.wallet_id, profile.wallet_sign_hash]);

  const router = useRouter();
  // Function to handle click
  const handleClick = () => {
    router.push("/settings/wallet/connect");
  };

  if (isLogin == "init") {
    return null;
  }

  if (isLogin == "loggedin") {
    // JSX for rendering
    return (
      <>
        <div className="cont z-10">
          {!isWallet && (
            <div className="btn btn-default" onClick={handleClick}>
              Connect your wallet
            </div>
          )}
          {isWallet && !isWalletVerified && (
            <>
              <Address address={profile.wallet_id || ""} />
              <div className="btn btn-default" onClick={handleClick}>
                Verify your wallet{" "}
              </div>
            </>
          )}
          {isWallet && isWalletVerified && (
            <>
              <Address address={profile.wallet_id || ""} />
              <div>Verified</div>
              <div>{ago}</div>
              <div className="btn btn-default" onClick={handleClick}>
                Update
              </div>
            </>
          )}
        </div>
      </>
    );
  }
};

export default SettingsWallet;
