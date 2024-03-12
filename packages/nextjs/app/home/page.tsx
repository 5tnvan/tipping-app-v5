"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AppContext, FastPayContext, FollowersContext } from "../context";
import { NextPage } from "next";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { ArrowDownLeft } from "~~/components/assets/ArrowDownLeft";
import { ArrowUpRight } from "~~/components/assets/ArrowUpRight";
import PayIncomingTransactions from "~~/components/subgraph/PayIncomingTransactions";
import PayIncomingTransactionsSum from "~~/components/subgraph/PayIncomingTransactionsSum";
import PayOutgoingTransactions from "~~/components/subgraph/PayOutgoingTransactions";
import PayOutgoingTransactionsSum from "~~/components/subgraph/PayOutgoingTransactionsSum";

const HomePage: NextPage = () => {
  const { isLoadingAuth, isAuth, profile, refetchAuth } = useContext(AppContext);
  const { isLoadingFollowers, followersData, refetchFollowers } = useContext(FollowersContext);
  const { fastPaySuccess, setFastPaySuccess, refetchFastPaySuccess } = useContext(FastPayContext);
  const [showFollow, setShowFollow] = useState("followers");
  const [showTransactions, setShowTransactions] = useState("incoming");

  console.log(profile.wallet_id);

  // Watch out, if FASTPAYSUCCESS changes, execute
  useEffect(() => {
    console.log("fastPaySuccess:", fastPaySuccess);
    if (fastPaySuccess) {
      //refresh transactions
      setFastPaySuccess(!fastPaySuccess); // fastPaySuccess: false
      console.log("refresh transactions on home page");
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
                <Link href={`/${followers.username}`} key={followers} className="flex flex-col items-center mr-4">
                  <Avatar profile={followers} width={12} />
                  {followers.username}
                </Link>
              ))}
            </ul>
          )}

          {!isLoadingFollowers && Array.isArray(followersData.following) && showFollow == "following" && (
            <div id="following" className="flex">
              {followersData?.following.map(following => (
                <Link href={`/${following.username}`} key={following} className="flex flex-col items-center mr-4">
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
              <span className="custom-text-blue">
                (<PayIncomingTransactionsSum receiverAddress={profile.wallet_id} />
                Ξ)
              </span>
            </button>
            <button className="mr-2 flex" onClick={() => setShowTransactions("outgoing")}>
              <span className={`${showTransactions == "outgoing" && "font-semibold"} flex items-center`}>
                Outgoing <ArrowUpRight />
              </span>
              <span className="custom-text-blue">
                (<PayOutgoingTransactionsSum senderAddress={profile.wallet_id} />
                Ξ)
              </span>
            </button>
          </div>
          {/* TRANSACTION DATA */}

          {showTransactions == "incoming" && <PayIncomingTransactions receiverAddress={profile.wallet_id} />}
          {showTransactions == "outgoing" && <PayOutgoingTransactions senderAddress={profile.wallet_id} />}
        </div>
      </>
    );
  }
};
export default HomePage;
