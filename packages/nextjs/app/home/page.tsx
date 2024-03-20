"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { AccountingContext, AppContext, FollowersContext } from "../context";
import { NextPage } from "next";
import { BanknotesIcon, UserIcon } from "@heroicons/react/24/solid";
import { IsLoading } from "~~/components/app/IsLoading";
import Transactions from "~~/components/app/accounting/Transactions";
import { Avatar } from "~~/components/app/authentication/Avatar";

const HomePage: NextPage = () => {
  const { isAuth } = useContext(AppContext);
  const { isLoadingFollowers, followersData } = useContext(FollowersContext);
  const { incomingTx, incomingTxSum, outgoingTx, outgoingTxSum } = useContext(AccountingContext);
  const [showFollow, setShowFollow] = useState("following");
  const [showTransactions, setShowTransactions] = useState("incoming");

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
        <div id="wildpay-home" className="z-10 max-h-screen pt-8 text-black">
          <div className="pl-6 pr-6">
            {/* FOLLOWS */}
            <div className="font-semibold mt-6 mb-3 text-primary text-4xl">Follows</div>
            {/* FOLLOWERS TAB */}
            <div role="tablist" className="tabs tabs-bordered">
              <div
                role="tab"
                className={`tab p-0 mr-2 justify-between text-base ${showFollow == "following" && "tab-active"}`}
                onClick={() => setShowFollow("following")}
              >
                Following
                <span className={`flex ml-2 text-base ${showFollow == "following" && "font-semibold text-primary"}`}>
                  {isLoadingFollowers && <IsLoading shape="rounded-md" width="4" height="4" />}
                  {!isLoadingFollowers && followersData?.followingCount}
                </span>
              </div>
              <div
                role="tab"
                className={`tab p-0 justify-between text-base ${showFollow == "followers" && "tab-active"}`}
                onClick={() => setShowFollow("followers")}
              >
                Followers
                <span className={`flex ml-2 text-base ${showFollow == "followers" && "font-semibold text-primary"}`}>
                  {isLoadingFollowers && <IsLoading shape="rounded-md" width="4" height="4" />}
                  {!isLoadingFollowers && followersData?.followersCount}
                </span>
              </div>
            </div>
            {/* FOLLOWERS DATA */}
            <div className="pt-2 w-88 overflow-y-auto pb-2">
              {isLoadingFollowers && (
                <div className="">
                  <div className="w-12 h-12 animate-pulse bg-slate-300 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"></div>
                </div>
              )}
              {!isLoadingFollowers && Array.isArray(followersData.following) && showFollow == "following" && (
                <div id="following" className="flex">
                  {followersData?.following.map((following: any) => (
                    <Link
                      href={`/${following.username}`}
                      key={following.id}
                      className="flex flex-col items-center mr-4"
                    >
                      <Avatar profile={following} width={12} ring={false} />
                      {following.username}
                    </Link>
                  ))}
                </div>
              )}
              {!isLoadingFollowers && Array.isArray(followersData.following) && showFollow == "followers" && (
                <ul id="followers" className="flex">
                  {followersData?.followers.map((followers: any) => (
                    <Link
                      href={`/${followers.username}`}
                      key={followers.id}
                      className="flex flex-col items-center mr-4"
                    >
                      <Avatar profile={followers} width={12} ring={false} />
                      {followers.username}
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="">
            {/* TRANSACTIONS */}
            <div className="font-semibold pl-6 pr-6 mt-6 mb-3 text-primary text-4xl">Payments</div>
            {/* TRANSACTIONS TAB */}
            <div role="tablist" className="tabs tabs-bordered pl-6 pr-6">
              <div
                role="tab"
                className={`tab mr-2 p-0 pb-3 justify-between ${showTransactions == "incoming" && "tab-active"}`}
                onClick={() => setShowTransactions("incoming")}
              >
                <div className="text-base">Incoming</div>
                <span
                  className={`flex ml-2 text-base ${showTransactions == "incoming" && "font-semibold text-primary"}`}
                >
                  {incomingTxSum}Ξ
                </span>
              </div>
              <div
                role="tab"
                className={`tab p-0 pb-3 justify-between ${showTransactions == "outgoing" && "tab-active"}`}
                onClick={() => setShowTransactions("outgoing")}
              >
                <div className="text-base">Outgoing</div>
                <span
                  className={`flex ml-2 text-base ${showTransactions == "outgoing" && "font-semibold text-primary"}`}
                >
                  {outgoingTxSum}Ξ
                </span>
              </div>
            </div>
            {/* TRANSACTION DATA */}
            <div className="wildui-transaction-scroll-home overflow-auto pt-4 pl-6 pr-6">
              {showTransactions == "incoming" && <Transactions tx={incomingTx} hide="to" />}
              {showTransactions == "outgoing" && <Transactions tx={outgoingTx} hide="from" />}
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default HomePage;
