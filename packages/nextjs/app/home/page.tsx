"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AccountingContext, AppContext, FastPayContext, FollowersContext } from "../context";
import { NextPage } from "next";
import { BanknotesIcon, UserCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import { IsLoading } from "~~/components/app/IsLoading";
import Transactions from "~~/components/app/accounting/Transactions";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { ArrowDownLeft } from "~~/components/assets/ArrowDownLeft";
import { ArrowUpRight } from "~~/components/assets/ArrowUpRight";

const HomePage: NextPage = () => {
  const router = useRouter();
  const { isLoadingAuth, isAuth, profile, refetchAuth } = useContext(AppContext);
  const { isLoadingFollowers, followersData, refetchFollowers } = useContext(FollowersContext);
  const { fastPaySuccess, setFastPaySuccess } = useContext(FastPayContext);
  const { incomingTx, incomingTxSum, outgoingTx, outgoingTxSum, refetchAccounting } = useContext(AccountingContext);
  const [showFollow, setShowFollow] = useState("followers");
  const [showTransactions, setShowTransactions] = useState("incoming");

  //LISTEN TO: fastPaySuccess
  useEffect(() => {
    if (fastPaySuccess) {
      router.refresh();
    }
  }, [fastPaySuccess]);

  if (isAuth == "no") {
    return (
      <>
        {/* CONTENT */}
        <div id="wildpay-is-not-auth" className="z-10 pt-28">
          <div className="font-semibold text-3xl mb-5">{"You are not logged in."}</div>
          <Link href="/login" className="btn text-base mb-3 w-full">
            {"Go to login"}
          </Link>
        </div>
      </>
    );
  }
  if (isAuth == "yes") {
    return (
      <>
        {/* CONTENT */}
        <div id="wildpay-is-auth-home" className="z-10 pt-8 text-black">
          {/* FOLLOWS */}
          <div className="text-xl mt-10 mb-3 flex items-center ">
            <div className="w-4">
              <UserIcon />
            </div>
            <span className="ml-1 font-semibold">Follows</span>
          </div>
          {/* FOLLOWERS TAB */}
          <div role="tablist" className="tabs tabs-bordered">
            <div
              role="tab"
              className={`tab p-0 mr-2 justify-between text-base ${showFollow == "followers" && "tab-active"}`}
              onClick={() => setShowFollow("followers")}
            >
              Followers
              <span className={`flex ml-2 text-base ${showFollow == "followers" && "font-semibold"}`}>
                {isLoadingFollowers && <IsLoading shape="rounded-md" width="4" height="4" />}
                {!isLoadingFollowers && followersData?.followersCount}
              </span>
            </div>
            <div
              role="tab"
              className={`tab p-0 justify-between text-base ${showFollow == "following" && "tab-active"}`}
              onClick={() => setShowFollow("following")}
            >
              Following
              <span className={`flex ml-2 text-base ${showFollow == "following" && "font-semibold"}`}>
                {isLoadingFollowers && <IsLoading shape="rounded-md" width="4" height="4" />}
                {!isLoadingFollowers && followersData?.followingCount}
              </span>
            </div>
          </div>
          {/* FOLLOWERS DATA */}
          <div className="pt-4">
            {isLoadingFollowers && (
              <div className="">
                <div className="w-12 h-12 animate-pulse bg-slate-300 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"></div>
              </div>
            )}
            {!isLoadingFollowers && Array.isArray(followersData.following) && showFollow == "followers" && (
              <ul id="followers" className="flex">
                {followersData?.followers.map(followers => (
                  <Link href={`/${followers.username}`} key={followers.id} className="flex flex-col items-center mr-4">
                    <Avatar profile={followers} width={12} />
                    {followers.username}
                  </Link>
                ))}
              </ul>
            )}

            {!isLoadingFollowers && Array.isArray(followersData.following) && showFollow == "following" && (
              <div id="following" className="flex">
                {followersData?.following.map(following => (
                  <Link href={`/${following.username}`} key={following.id} className="flex flex-col items-center mr-4">
                    <Avatar profile={following} width={12} />
                    {following.username}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* TRANSACTIONS */}
          <div className="text-xl mt-10 mb-3 flex items-center ">
            <div className="w-4">
              <BanknotesIcon />
            </div>
            <span className="ml-1 font-semibold">Transactions</span>
          </div>
          {/* TRANSACTIONS TAB */}
          <div role="tablist" className="tabs tabs-bordered">
            <div
              role="tab"
              className={`tab mr-2 p-0 pb-3 justify-between ${showTransactions == "incoming" && "tab-active"}`}
              onClick={() => setShowTransactions("incoming")}
            >
              <div className="badge badge-success text-white text-base">Incoming</div>
              <span className={`flex ml-2 text-base ${showTransactions == "incoming" && "font-semibold"}`}>{incomingTxSum}Ξ</span>
            </div>
            <div
              role="tab"
              className={`tab p-0 pb-3 justify-between ${showTransactions == "outgoing" && "tab-active"}`}
              onClick={() => setShowTransactions("outgoing")}
            >
              <div className="badge badge-warning text-white text-base">Outgoing</div>
              <span className={`flex ml-2 text-base ${showTransactions == "outgoing" && "font-semibold"}`}>{outgoingTxSum}Ξ</span>
            </div>
          </div>
          {/* TRANSACTION DATA */}
          <div className="pt-4">
            {showTransactions == "incoming" && <Transactions tx={incomingTx} />}
            {showTransactions == "outgoing" && <Transactions tx={outgoingTx} />}
          </div>
        </div>
      </>
    );
  }
};
export default HomePage;
