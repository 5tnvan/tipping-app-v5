"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AccountingContext, AppContext, FastPayContext, FollowersContext } from "../context";
import { NextPage } from "next";
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
        <div id="wildpay-is-auth-home" className="z-10 pt-28 text-black">
          {/* HOME */}
          <div className="text-3xl mb-2">Home</div>
          {/* FOLLOWERS */}
          <div className="flex mb-3">
            <button className="mr-2" onClick={() => setShowFollow("followers")}>
              <span className={`${showFollow == "followers" && "font-semibold"}`}>Followers </span>
              <span>({followersData?.followersCount})</span>
            </button>
            <button className="mr-2" onClick={() => setShowFollow("following")}>
              <span className={`${showFollow == "following" && "font-semibold"}`}>Following </span>
              <span>({followersData?.followingCount})</span>
            </button>
          </div>
          {/* FOLLOWERS DATA */}
          {isLoadingFollowers && <div>is loading</div>}
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

          {/* TRANSACTIONS */}
          <div className="flex mb-3 mt-5">
            <button className="mr-2 flex" onClick={() => setShowTransactions("incoming")}>
              <span className={`${showTransactions == "incoming" && "font-semibold"} flex items-center`}>
                Incoming <ArrowDownLeft />
              </span>
              <span className="custom-text-blue">{incomingTxSum}Ξ</span>
            </button>
            <button className="mr-2 flex" onClick={() => setShowTransactions("outgoing")}>
              <span className={`${showTransactions == "outgoing" && "font-semibold"} flex items-center`}>
                Outgoing <ArrowUpRight />
              </span>
              <span className="custom-text-blue">{outgoingTxSum}Ξ</span>
            </button>
          </div>
          {/* TRANSACTION DATA */}

          {showTransactions == "incoming" && <Transactions tx={incomingTx} />}
          {showTransactions == "outgoing" && <Transactions tx={outgoingTx} />}
        </div>
      </>
    );
  }
};
export default HomePage;
