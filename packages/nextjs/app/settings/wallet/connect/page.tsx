"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "../../actions";
import type { NextPage } from "next";
import { useAccount, useSignMessage } from "wagmi";
import { Address } from "~~/components/scaffold-eth/Address";
import { useAuthenticationWithProfileInit } from "~~/hooks/app/useAuthentication";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const SettingsWallet: NextPage = () => {
  const router = useRouter();
  const { isLogin, profile } = useAuthenticationWithProfileInit();
  const [isWallet, setIsWallet] = useState(false);
  const [isWalletVerified, setIsWalletVerified] = useState(false);
  const { address } = useAccount();
  const {
    data: signMessageData,
    isSuccess: signMessageSuccess,
    error,
    signMessage,
  } = useSignMessage({
    message: "Hello, Beyond! I am signing this message to verify the ownership of my wallet.",
  });

  useEffect(() => {
    if (profile.wallet_id) {
      setIsWallet(true);
    }
    if (address) {
      setIsWallet(true);
    }

    if (profile.wallet_sign_hash) {
      setIsWalletVerified(true);
    } else {
      setIsWalletVerified(false);
    }
  }, [address, profile]);

  // Function to handle sign msg
  const handleSignMessage = () => {
    if (signMessage) {
      signMessage();
    }
    if (error) {
      console.error("Error signing message:", error);
    }
    if (signMessageSuccess) {
      updateProfile(address, signMessageData, new Date().toISOString());
      setIsWalletVerified(true);
    }
  };

  if (isLogin == "init") {
    return null;
  }

  // Renders HTML
  if (isLogin == "loggedin") {
    return (
      <>
        {/* CONTENT */}
        <div className="cont z-10 w-96">
          {isWallet && isWalletVerified ? (
            <>
              <div className="font-semibold text-3xl">{"It's done 🎉"}</div>
              <div className="mb-5">You are all set.</div>
            </>
          ) : (
            <>
              <div className="font-semibold text-3xl">{"Link and verify"}</div>
              <div className="mb-5">the ownership of your wallet. {"It’s free of charge."}</div>
            </>
          )}

          {/* Steps */}
          <ul className="steps steps-vertical lg:steps-vertical">
            {/* 1.Select a network */}
            <li className="step step-primary">
              <div>Select a network</div>
              <div className="ml-10">Eth</div>
            </li>

            {/* 2.Link your wallet */}
            {!isWallet && (
              <li className="step ">
                <div className="">Link your wallet</div>
                <button className="btn btn-glass ml-10 w-72">Connect wallet</button>
              </li>
            )}
            {isWallet && (
              <li className="step step-primary">
                <div className="font-semibold">Link your wallet</div>
                <div className="flex flex-col ml-10">
                  <Address address={profile.wallet_id || address} />
                </div>
              </li>
            )}

            {/* 2.Verify ownership */}
            {!isWallet && (
              <li className="step ">
                <div>Verify ownership</div>
                <button type="button" className="btn glass ml-10 w-72" disabled>
                  Sign a message
                </button>
              </li>
            )}
            {isWallet && !isWalletVerified && (
              <li className="step ">
                <div>Verify ownership</div>
                <button className="btn btn-glass ml-10 w-72" onClick={handleSignMessage}>
                  Sign a message
                </button>
              </li>
            )}
            {isWallet && isWalletVerified && (
              <li className="step step-primary">
                <div>Verify ownership</div>
                <div className="ml-10 w-72 text-left">
                  {
                    <>
                      <div>Signed</div>
                      <div className="">{profile.wallet_sign_hash}</div>
                      <div className="">{profile.wallet_sign_timestamp}</div>
                    </>
                  }
                  {signMessageSuccess && (
                    <>
                      <div>Signed just now</div>
                      <div className="">{signMessageData}</div>
                    </>
                  )}
                </div>
              </li>
            )}
          </ul>

          {/* Button */}
          {isWallet && isWalletVerified && (
            <>
              <div className="btn btn-neutral mt-5" onClick={() => router.push("/settings/wallet")}>
                Back to Wallet settings
              </div>
            </>
          )}
        </div>
      </>
    );
  }
};

export default SettingsWallet;
