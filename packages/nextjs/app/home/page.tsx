"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext, AuthUserContext, AuthUserFollowsContext, ModalsContext } from "../context";
import { NextPage } from "next";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { IsLoading } from "~~/components/app/IsLoading";
import Transactions from "~~/components/app/accounting/Transactions";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { BaseIcon } from "~~/components/assets/BaseIcon";
import { EthIcon } from "~~/components/assets/EthIcon";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth/useNativeCurrencyPrice";
import { useIncomingTransactions } from "~~/utils/app/fetch/fetchIncomingTransactions";
import { useOutgoingTransactions } from "~~/utils/app/fetch/fetchOutgoingTransactions";
import { calculateSum } from "~~/utils/app/functions/calculateSum";
import { convertEthToUsd } from "~~/utils/app/functions/convertEthToUsd";
import { findLatestBio } from "~~/utils/app/functions/findLatestBio";

/*
 * HOME PAGE
 * /home
 */
const HomePage: NextPage = () => {
  /* PARENTS CONTEXT */
  const { isAuthenticated } = useContext(AuthContext);
  const { profile } = useContext(AuthUserContext);
  const { isLoadingFollows, followers, following } = useContext(AuthUserFollowsContext);

  /* TRANSACTIONS VARIABLES */
  const [incomingEthTx, setIncomingEthTx] = useState<any>();
  const [incomingEthTxSum, setIncomingEthTxSum] = useState(0);
  const [incomingBaseTx, setIncomingBaseTx] = useState<any>();
  const [incomingBaseTxSum, setIncomingBaseTxSum] = useState(0);
  const [outgoingEthTx, setOutgoingEthTx] = useState<any>();
  const [outgoingEthTxSum, setOutgoingEthTxSum] = useState(0);
  const [outgoingBaseTx, setOutgoingBaseTx] = useState<any>();
  const [outgoingBaseTxSum, setOutgoingBaseTxSum] = useState(0);

  /* FETCH TRANSACTIONS */
  const incomingRes = useIncomingTransactions(profile?.wallet_id);
  const outgoingRes = useOutgoingTransactions(profile?.wallet_id);

  useEffect(() => {
    setIncomingEthTx(incomingRes.ethereumData);
    setIncomingEthTxSum(calculateSum(incomingRes.ethereumData));
    setIncomingBaseTx(incomingRes.baseData);
    setIncomingBaseTxSum(calculateSum(incomingRes.baseData));
    setOutgoingEthTx(outgoingRes.ethereumData);
    setOutgoingEthTxSum(calculateSum(outgoingRes.ethereumData));
    setOutgoingBaseTx(outgoingRes.baseData);
    setOutgoingBaseTxSum(calculateSum(outgoingRes.baseData));
  }, [incomingRes, outgoingRes]);

  /* TABS */
  const [showFollow, setShowFollow] = useState("following"); //default tab: following
  const [showTransactions, setShowTransactions] = useState("incoming"); //default tab: incoming
  const [network, setNetwork] = useState("ethereum"); //default network: eth
  const nativeCurrencyPrice = useNativeCurrencyPrice();

  /* COPY BUTTONS */
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);
  const handleCopyToClipboard = (number: any) => {
    navigator.clipboard.writeText("https://www.wildpay.app/" + profile.username);
    if (number == 1) {
      setCopied1(true);
      setTimeout(() => {
        setCopied1(false);
      }, 1500); // Reset the copied state after 2 seconds
    }
    if (number == 2) {
      setCopied2(true);
      setTimeout(() => {
        setCopied2(false);
      }, 1500); // Reset the copied state after 2 seconds
    }
  };

  if (isAuthenticated == "no") {
    return (
      <>
        {/* CONTENT */}
        <div id="wildpay-is-not-auth" className="z-10 pt-28 pl-6 pr-6">
          <div className="font-semibold text-3xl mb-5">{"You are not logged in."}</div>
          <Link href="/login" className="btn text-base mb-3 w-full">
            {"Go to login"}
          </Link>
        </div>
      </>
    );
  }
  if (isAuthenticated == "yes") {
    return (
      <div id="wildpay-home" className="z-10 max-h-dvh pt-8 text-black">
        <div className="pl-6 pr-6">
          {/* BIOS, LEVEL */}
          <div className="stats shadow bg-accent text-accent-content mt-5 mb-5 w-full">
            <div className="stat">
              <div className="flex">
                <div className="mr-1 text-nowrap">Total Views</div>
                <div className="tooltip tooltip-right flex justify-center" data-tip="Views on your last content">
                  <button className="">
                    <QuestionMarkCircleIcon width={14} />
                  </button>
                </div>
              </div>
              <div className="stat-value text-primary text-2xl">
                {profile?.profile_bios.length > 0 ? findLatestBio(profile?.profile_bios)?.views : "0"}
              </div>
              <ModalsContext.Consumer>
                {({ openCreateModal }) => (
                  <div className="stat-desc cursor-pointer" onClick={openCreateModal}>
                    Create content
                  </div>
                )}
              </ModalsContext.Consumer>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <Link href="/profile/view" className="avatar online">
                  {profile && (
                    <Avatar profile={profile} width={14} height={14} border={0} ring={14} gradient={"g-white"} />
                  )}
                </Link>
              </div>
              <Link href="/levels" className="stat-title">
                Level {profile?.levels.length > 0 ? profile?.levels[0].level : "0"}
              </Link>
              <Link href="/levels" className="stat-value text-2xl">
                {profile?.levels.length == 0 && "noob"}
                {profile?.levels[0]?.level == 1 && "creator"}
                {profile?.levels[0]?.level == 2 && "builder"}
                {profile?.levels[0]?.level == 3 && "architect"}
                {profile?.levels[0]?.level == 4 && "visionary"}
                {profile?.levels[0]?.level == 5 && "god-mode"}
              </Link>
              <Link href="/levels" className="stat-desc text-secondary">
                View all levels
              </Link>
            </div>
          </div>
          {/* FOLLOWS */}
          {/* FOLLOWERS TAB */}
          <div role="tablist" className="tabs tabs-bordered">
            <div
              role="tab"
              className={`tab hover:border-primary hover:text-primary p-0 mr-2 justify-between text-base ${
                showFollow == "following" && "tab-active"
              }`}
              onClick={() => setShowFollow("following")}
            >
              Following
              <span className={`flex ml-2 text-base ${showFollow == "following" && "font-semibold"}`}>
                {isLoadingFollows && <IsLoading shape="rounded-md" width="4" height="4" />}
                {!isLoadingFollows && following?.length}
              </span>
            </div>
            <div
              role="tab"
              className={`tab hover:border-primary hover:text-primary p-0 justify-between text-base ${
                showFollow == "followers" && "tab-active"
              }`}
              onClick={() => setShowFollow("followers")}
            >
              Followers
              <span className={`flex ml-2 text-base ${showFollow == "followers" && "font-semibold"}`}>
                {isLoadingFollows && <IsLoading shape="rounded-md" width="4" height="4" />}
                {!isLoadingFollows && followers?.length}
              </span>
            </div>
          </div>
          {/* FOLLOWERS DATA */}
          <div className="pt-2 w-88 overflow-y-auto pb-2">
            {isLoadingFollows && (
              <div className="">
                <div className="w-12 h-12 animate-pulse bg-slate-200 rounded-full"></div>
              </div>
            )}
            {!isLoadingFollows && showFollow == "following" && following?.length == 0 && (
              <div className="flex h-full justify-center items-center">
                <Link href="/bios" className="btn btn-neutral">
                  Start following someone 🥳
                </Link>
              </div>
            )}
            {!isLoadingFollows && showFollow == "followers" && followers?.length == 0 && (
              <div className="flex h-full justify-center items-center">
                <div className="btn btn-neutral" onClick={() => handleCopyToClipboard(1)}>
                  {copied1 ? (
                    <>
                      <span className="">
                        Copied <span className="text-primary">{"@" + profile?.username}</span>
                      </span>
                      <span className="text-primary">
                        <CheckCircleIcon width={14} />
                      </span>
                    </>
                  ) : (
                    "Share your profile and get followers 🥳"
                  )}
                </div>
              </div>
            )}
            {!isLoadingFollows && Array.isArray(following) && showFollow == "following" && (
              <>
                <ul id="following" className="flex">
                  {following?.map((following: any) => (
                    <Link
                      href={`/${following.following.username}`}
                      key={following.following.id}
                      className="flex flex-col items-center mr-4 font-medium"
                    >
                      {following.following.profile_bios.length > 0 && (
                        <Avatar
                          profile={following.following}
                          width={12}
                          height={12}
                          border={2}
                          ring={13}
                          gradient={"g-tropical"}
                        />
                      )}
                      {following.following.profile_bios.length == 0 && (
                        <Avatar
                          profile={following.following}
                          width={12}
                          height={12}
                          border={0}
                          ring={13}
                          gradient={"g-white"}
                        />
                      )}
                      {following.following.username}
                    </Link>
                  ))}
                </ul>
              </>
            )}
            {!isLoadingFollows && Array.isArray(followers) && showFollow == "followers" && (
              <ul id="followers" className="flex">
                {followers?.map((follower: any) => (
                  <Link
                    href={`/${follower.follower.username}`}
                    key={follower.follower.id}
                    className="flex flex-col items-center mr-4 font-medium"
                  >
                    {follower.follower.profile_bios.length > 0 && (
                      <Avatar
                        profile={follower.follower}
                        width={12}
                        height={12}
                        border={2}
                        ring={13}
                        gradient={"g-tropical"}
                      />
                    )}
                    {follower.follower.profile_bios.length == 0 && (
                      <Avatar
                        profile={follower.follower}
                        width={12}
                        height={12}
                        border={0}
                        ring={13}
                        gradient={"g-white"}
                      />
                    )}
                    {follower.follower.username}
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="">
          {/* PAYMENTS */}
          <div className="flex pl-6 pr-6 mt-6 mb-3 items-center justify-between">
            <div className="font-semibold text-primary text-xl">Payments</div>
            {/* PAYMENTS NETWORKS TAB */}
            <div className="flex">
              {/* PAYMENTS NETWORKS TAB: ETHEREUM */}
              <div
                className={`btn font-medium h-6 min-h-6 gap-0 px-2 mr-1 ${
                  network === "ethereum" && "bg-primary text-neutral hover:bg-blue-800 border-0"
                }`}
                onClick={() => setNetwork("ethereum")}
              >
                <EthIcon width={14} height={14} fill={`${network === "ethereum" ? "#ffffff" : "#3C3C3C"}`} />
                ethereum
              </div>
              {/* PAYMENTS NETWORKS TAB: BASE */}
              <div
                className={`btn font-medium h-6 min-h-6 gap-0 px-2 ${
                  network === "base" && "bg-primary text-neutral hover:bg-blue-800 border-0"
                }`}
                onClick={() => setNetwork("base")}
              >
                <BaseIcon width={10} height={10} fill={`${network === "base" ? "#ffffff" : "#3C3C3C"}`} />
                <span className="pl-1">base</span>
              </div>
            </div>
          </div>
          {/* PAYMENTS TRANSACTIONS TAB */}
          <div role="tablist" className="tabs tabs-bordered pl-6 pr-6">
            {/* PAYMENTS TRANSACTIONS TAB : INCOMING */}
            <div
              role="tab"
              className={`tab hover:border-primary hover:text-primary mr-2 p-0 pb-3 justify-between ${
                showTransactions == "incoming" && "tab-active"
              }`}
              onClick={() => setShowTransactions("incoming")}
            >
              {/* PAYMENTS TRANSACTIONS TAB : INCOMING SUM ($USD) */}
              <div className="text-base">
                Incoming
                <span className={`text-primary ${showTransactions == "incoming" && "font-semibold"}`}>
                  {" $"}
                  {network == "ethereum" && convertEthToUsd(incomingEthTxSum, nativeCurrencyPrice)}
                  {network == "base" && convertEthToUsd(incomingBaseTxSum, nativeCurrencyPrice)}
                </span>
              </div>
              {/* PAYMENTS TRANSACTIONS TAB : INCOMING LENGTH (NUM) */}
              <span className={`flex ml-2 text-base ${showTransactions == "incoming" && "font-semibold"}`}>
                {network == "ethereum" && incomingEthTx?.paymentChanges?.length}
                {network == "base" && incomingBaseTx?.paymentChanges?.length}
              </span>
            </div>
            {/* PAYMENTS TRANSACTIONS TAB : OUTGOING */}
            <div
              role="tab"
              className={`tab hover:border-primary hover:text-primary p-0 pb-3 justify-between ${
                showTransactions == "outgoing" && "tab-active"
              }`}
              onClick={() => setShowTransactions("outgoing")}
            >
              {/* PAYMENTS TRANSACTIONS TAB : OUTGOING SUM ($USD) */}
              <div className="text-base">
                Outgoing
                <span className={`text-primary ${showTransactions == "outgoing" && "font-semibold"}`}>
                  {" $"}
                  {network == "ethereum" && convertEthToUsd(outgoingEthTxSum, nativeCurrencyPrice)}
                  {network == "base" && convertEthToUsd(outgoingBaseTxSum, nativeCurrencyPrice)}
                </span>
              </div>
              {/* PAYMENTS TRANSACTIONS TAB : OUTGOING SUM LENGTH (NUM) */}
              <span className={`flex ml-2 text-base ${showTransactions == "outgoing" && "font-semibold"}`}>
                {network == "ethereum" && outgoingEthTx?.paymentChanges?.length}
                {network == "base" && outgoingBaseTx?.paymentChanges?.length}
              </span>
            </div>
          </div>
          {/* PAYMENTS TRANSACTIONS DATA */}
          <div className="wildui-transaction-scroll-home overflow-auto pt-4 pl-6 pr-6 pb-8">
            {showTransactions === "incoming" && (
              <>
                {(network === "ethereum" ? incomingEthTx : incomingBaseTx)?.paymentChanges?.length === 0 && (
                  <div className="flex h-full justify-center items-center">
                    <div className="btn btn-neutral" onClick={() => handleCopyToClipboard(2)}>
                      {copied2 ? (
                        <>
                          <span className="">
                            Copied <span className="text-primary">{"@" + profile.username}</span>
                          </span>
                          <span className="text-primary ml-0">
                            <CheckCircleIcon width={14} />
                          </span>
                        </>
                      ) : (
                        "Share your profile and get paid 🥳"
                      )}
                    </div>
                  </div>
                )}
                {!profile.wallet_id && (
                  <div className="flex h-full justify-center items-center">
                    <Link href="/settings" className="btn btn-neutral">
                      Verify your wallet to get paid 🥳
                    </Link>
                  </div>
                )}
              </>
            )}
            {showTransactions === "outgoing" && (
              <>
                {(network === "ethereum" ? outgoingEthTx : outgoingBaseTx)?.paymentChanges?.length === 0 && (
                  <div className="flex h-full justify-center items-center">
                    <ModalsContext.Consumer>
                      {({ openFastPayModal }) => (
                        <div className="btn btn-neutral" onClick={openFastPayModal}>
                          Start paying someone 🥳
                        </div>
                      )}
                    </ModalsContext.Consumer>
                  </div>
                )}
                {!profile.wallet_id && (
                  <div className="flex h-full justify-center items-center">
                    <Link href="/settings" className="btn btn-neutral">
                      Verify your wallet to start paying 🥳
                    </Link>
                  </div>
                )}
              </>
            )}
            {showTransactions === "incoming" && (
              <Transactions
                tx={network === "ethereum" ? incomingEthTx : incomingBaseTx}
                hide="to"
                network={network === "ethereum" ? "ethereum" : "base"}
              />
            )}
            {showTransactions === "outgoing" && (
              <Transactions
                tx={network === "ethereum" ? outgoingEthTx : outgoingBaseTx}
                hide="from"
                network={network === "ethereum" ? "ethereum" : "base"}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
};
export default HomePage;
