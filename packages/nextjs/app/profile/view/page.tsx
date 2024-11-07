"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NextPage } from "next";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { AuthContext, AuthUserContext, AuthUserPaymentContext } from "~~/app/context";
import Transactions from "~~/components/app/accounting/Transactions";
import { BaseIcon } from "~~/components/assets/BaseIcon";
import { CopyIcon } from "~~/components/assets/CopyIcon";
import { EthIcon } from "~~/components/assets/EthIcon";
import { FuseIcon } from "~~/components/assets/FuseIcon";
import { useOutsideClick } from "~~/hooks/scaffold-eth/useOutsideClick";

const ProfileView: NextPage = () => {
  /* CONSUME CONTEXT */
  const { isAuthenticated } = useContext(AuthContext);
  const { profile } = useContext(AuthUserContext);
  const { incomingRes } = useContext(AuthUserPaymentContext);

  /*
   * NETWORK DROPDOWN
   * show on default whichever network has more transactions
   */
  const [network, setNetwork] = useState<string>("ethereum"); // default to ethereum
  useEffect(() => {
    if (incomingRes.ethereumData?.paymentChanges?.length > incomingRes.baseData?.paymentChanges?.length) {
      setNetwork("ethereum");
    } else if (incomingRes.baseData?.paymentChanges?.length > incomingRes.fuseData?.paymentChanges?.length) {
      setNetwork("base");
    } else {
      setNetwork("fuse");
    }
  }, [incomingRes.ethereumData, incomingRes.baseData, incomingRes.fuseData]);

  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const closeDropdown = () => {
    dropdownRef.current?.removeAttribute("open");
  };
  useOutsideClick(dropdownRef, closeDropdown);

  /* COPY BUTTON */
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);

  const handleCopyToClipboard = (number: any) => {
    navigator.clipboard.writeText("https://www.kinnectwallet.com/" + profile.username);
    if (number === 1) {
      setCopied1(true);
      setTimeout(() => {
        setCopied1(false);
      }, 1500);
    }
    if (number === 2) {
      setCopied2(true);
      setTimeout(() => {
        setCopied2(false);
      }, 1500);
    }
  };

  /* RENDER */
  if (isAuthenticated === "no") {
    return (
      <div id="wildpay-is-not-auth" className="z-10 pt-28 pl-6 pr-6">
        <div className="font-semibold text-3xl mb-5">{"You are not logged in."}</div>
        <Link href="/login" className="btn text-base mb-3 w-full">
          {"Go to login"}
        </Link>
      </div>
    );
  }

  if (isAuthenticated === "yes") {
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
              <div className="scr-item custom-bg-image-01 flex items-center relative shadow-xl">
                <div className="absolute network flex">
                  <div className="btn hover:bg-fuchsia-500 font-medium h-6 min-h-6 gap-0 bg-fuchsia-400 px-2 mr-1">
                    <EthIcon width={14} height={14} fill="#3C3C3C" />
                    ethereum
                  </div>
                  <div className="btn hover:bg-fuchsia-500 font-medium flex h-6 min-h-6 gap-0 bg-fuchsia-400 px-2">
                    <BaseIcon width={10} height={10} fill="#3C3C3C" />
                    <span className="pl-1">base</span>
                  </div>
                  <div className="btn hover:bg-fuchsia-500 font-medium flex h-6 min-h-6 gap-0 bg-fuchsia-400 px-2 ml-1">
                    <FuseIcon />
                    <span className="pl-1">fuse</span>
                  </div>
                </div>
                <div className=" text-6xl font-black custom-difference-blend">{profile.username}</div>
                <div
                  className="absolute btn btn-accent px-3 url h-8 min-h-8 bg-gradient-to-r from-cyan-600 via-lime-500 border-0"
                  onClick={() => handleCopyToClipboard(1)}
                >
                  <div className="flex items-center">
                    {copied1 ? (
                      <>
                        <span className="mr-1">Copied</span>
                        <span className="text-secondary">
                          <CheckCircleIcon width={14} />
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="mr-1">kinnectwallet.com/{profile.username}</span>
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
              <div>
                Payments (
                {(network === "ethereum"
                  ? incomingRes.ethereumData
                  : network === "base"
                  ? incomingRes.baseData
                  : incomingRes.fuseData) == undefined && 0}
                {
                  (network === "ethereum"
                    ? incomingRes.ethereumData
                    : network === "base"
                    ? incomingRes.baseData
                    : incomingRes.fuseData
                  )?.paymentChanges?.length
                }
                )
              </div>
              <details ref={dropdownRef} className="dropdown dropdown-end cursor-pointer">
                <summary className="flex text-neutral-900 hover:text-neutral-700">
                  <div className="mr-1">Network</div>
                  <ChevronDownIcon width={12} />
                </summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                  <li>
                    <div
                      className={`${network == "ethereum" && "bg-neutral-200"}`}
                      onClick={() => {
                        setNetwork("ethereum");
                        closeDropdown();
                      }}
                    >
                      <EthIcon width={16} height={16} fill="#3C3C3C" />
                      Ethereum
                    </div>
                  </li>
                  <li>
                    <div
                      className={`${network == "base" && "bg-neutral-200"}`}
                      onClick={() => {
                        setNetwork("base");
                        closeDropdown();
                      }}
                    >
                      <BaseIcon width={14} height={10} fill="#3C3C3C" />
                      Base
                    </div>
                  </li>
                  <li>
                    <div
                      className={`${network == "fuse" && "bg-neutral-200"}`}
                      onClick={() => {
                        setNetwork("fuse");
                        closeDropdown();
                      }}
                    >
                      <FuseIcon />
                      Fuse
                    </div>
                  </li>
                </ul>
              </details>
            </div>
            <div className="wildui-transaction-scroll-profile-view overflow-auto pr-6 pl-6 pb-10">
              {(network === "ethereum"
                ? incomingRes.ethereumData
                : network === "base"
                ? incomingRes.baseData
                : incomingRes.fuseData) == undefined && (
                <div className="flex h-full justify-center items-center">
                  <Link href="/settings" className="btn btn-neutral">
                    Verify your wallet to get funded 🥳
                  </Link>
                </div>
              )}
              {(network === "ethereum"
                ? incomingRes.ethereumData
                : network === "base"
                ? incomingRes.baseData
                : incomingRes.fuseData
              )?.paymentChanges?.length == 0 && (
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
                      "Share your profile and get funded 🥳"
                    )}
                  </div>
                </div>
              )}
              <Transactions
                tx={
                  network === "ethereum"
                    ? incomingRes.ethereumData
                    : network === "base"
                    ? incomingRes.baseData
                    : incomingRes.fuseData
                }
                hide="to"
                network={network}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default ProfileView;
