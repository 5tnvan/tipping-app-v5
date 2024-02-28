"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../actions";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth/Address";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

// Component definition
const SettingsWallet: NextPage = () => {
  // Initializing state variables
  const [isWallet, setIsWallet] = useState(false);
  const [isWalletVerified, setIsWalletVerified] = useState(false);
  const [ago, setAgo] = useState("");
  const [user, setUser] = useState({
    wallet_id: null,
    wallet_sign_hash: null,
    wallet_sign_timestamp: null,
  });

  // Creating router instance
  const router = useRouter();

  // Function to get user data
  const getUsersData = async () => {
    try {
      const data = await getUser();
      if (data.error) {
        router.push("/login");
      } else {
        setUser((prevUser) => ({
          ...prevUser,
          wallet_id: data.user.wallet_id,
          wallet_sign_hash: data.user.wallet_sign_hash,
          wallet_sign_timestamp: data.user.wallet_sign_timestamp,
        }));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Function to calculate days ago
  const calculateAgo = () => {
    const currentTimestamp = new Date().getTime();
    const yourTimestampString = user.wallet_sign_timestamp;
    const yourTimestamp = new Date(yourTimestampString).getTime();

    const timeDifference = currentTimestamp - yourTimestamp;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursAgo = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    setAgo(`${daysAgo} days and ${hoursAgo} hours ago`);
  };

  // useEffect for side effects
  useEffect(() => {
    getUsersData();
  }, []); // Empty dependency array to run only once when component mounts

  useEffect(() => {
    if (user.wallet_id) {
      setIsWallet(true);
    }
    if (user.wallet_sign_hash) {
      setIsWalletVerified(true);
    }
    calculateAgo();
  }, [user.wallet_id, user.wallet_sign_hash]);

  // Function to handle click
  const handleClick = () => {
    router.push("/settings/wallet/connect");
  };

  // JSX for rendering
  return (
    <div className="cont z-10">
      {!isWallet && (
        <div className="btn btn-default" onClick={handleClick}>
          Connect your wallet
        </div>
      )}
      {isWallet && !isWalletVerified && (
        <>
          <Address address={user.wallet_id} />
          <div className="btn btn-default" onClick={handleClick}>
            Verify your wallet{" "}
          </div>
        </>
      )}
      {isWallet && isWalletVerified && (
        <>
          <Address address={user.wallet_id} />
          <div>Verified</div>
          <div>{ago} ago</div>
          <div className="btn btn-default" onClick={handleClick}>
            Update
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsWallet;
