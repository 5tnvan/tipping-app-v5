"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { NextPage } from "next";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { AccountingContext, AppContext } from "~~/app/context";
import Transactions from "~~/components/app/accounting/Transactions";
import { BaseIcon } from "~~/components/assets/BaseIcon";
import { CopyIcon } from "~~/components/assets/CopyIcon";
import { EthIcon } from "~~/components/assets/EthIcon";
import "~~/styles/app-profile.css";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const ProfileView: NextPage = () => {
  const { isAuth, profile } = useContext(AppContext);
  const { incomingTx } = useContext(AccountingContext);
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText("https://www.wildpay.app/" + profile.username);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500); // Reset the copied state after 2 seconds
  };

  if (isAuth == "no") {
    return (
      <div id="wildpay-is-not-auth" className="z-10 pt-28">
        <div className="font-semibold text-3xl mb-5">{"You are not logged in."}</div>
        <Link href="/login" className="btn text-base mb-3 w-full">
          {"Go to login"}
        </Link>
      </div>
    );
  }

  if (isAuth == "yes") {
    return (
      <>
        {/* CTA */}
        <div id="wildpay-cta" className="ml-6 mr-6 z-10 relative">
          <Link href="/profile/edit">
            <button className="btn-primary btn w-full text-base">Edit Profile</button>
          </Link>
        </div>
        <div id="profile-view-content" className="flex flex-col profile z-10 items-center">
          {/* Scroll Snap */}
          <div className="w-full pl-6 pr-6 pb-3 pt-3 flex justify-center">
            <div className="scr">
              {/* Card 3 */}
              <div className="scr-item custom-bg-image-01 flex items-center relative">
                <div className="absolute network flex">
                  <div className="btn btn-accent font-medium h-6 min-h-6 gap-0 bg-fuchsia-400 px-2 mr-1">
                    <EthIcon width={14} height={14} />
                    ethereum
                  </div>
                  <div className="btn btn-accent font-medium flex h-6 min-h-6 gap-0 bg-fuchsia-400 px-2">
                    <BaseIcon width={10} height={10} fill="#3C3C3C" />
                    <span className="pl-1">base</span>
                  </div>
                </div>
                <div className=" text-6xl font-black custom-difference-blend">{profile.username}</div>
                <div
                  className="absolute btn btn-accent px-3 url h-8 min-h-8 bg-gradient-to-r from-cyan-600 via-lime-500 border-0"
                  onClick={handleCopyToClipboard}
                >
                  <div className="flex items-center">
                    {copied ? (
                      <>
                        <span className="mr-1">Copied</span>
                        <span className="text-secondary">
                          <CheckCircleIcon width={20} />
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="mr-1">wildpay.app/{profile.username}</span>
                        <CopyIcon />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payments Table */}
          <div className="latest w-full rounded-t-2xl bg-slate-100 pt-6 drop-shadow-sm">
            <div className="flex justify-between font-semibold pb-2 pr-6 pl-6">
              <div>Payments ({incomingTx?.paymentChanges?.length})</div>
              <div className="flex">
                <span className="mr-1">All</span>
                <ChevronDownIcon width={13} />
              </div>
            </div>
            <div className="wildui-transaction-scroll-profile-view overflow-auto pr-6 pl-6 pb-10">
              <Transactions tx={incomingTx} hide="to" />
              {incomingTx?.paymentChanges?.length == 0 && (
                <div className="flex h-full justify-center items-center">
                  <div className="btn btn-neutral">Share your profile and get paid 🥳</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default ProfileView;
