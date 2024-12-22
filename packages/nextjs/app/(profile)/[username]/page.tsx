"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import { AuthContext, UserContext, UserPaymentContext } from "~~/app/context";
import { CardWithUsername } from "~~/components/app/CardWithUsername";
import Transactions from "~~/components/app/accounting/Transactions";
import { ProfilePayModal } from "~~/components/app/modal/ProfilePayModal";
import { ReceiptModal } from "~~/components/app/modal/ReceiptModal";
import { BaseIcon } from "~~/components/assets/BaseIcon";
import { EthIcon } from "~~/components/assets/EthIcon";
import { FuseIcon } from "~~/components/assets/FuseIcon";
import { useOutsideClick } from "~~/hooks/scaffold-eth/useOutsideClick";

/**
 * ROUTE: /[username]
 * DESCRIPTION: Public Profile
 **/

const ProfileUsername: NextPage = () => {
  const router = useRouter();
  /* CONSUME CONTEXT */
  const { isAuthenticated } = useContext(AuthContext);
  const { isLoadingUser, profile } = useContext(UserContext);
  const { incomingRes } = useContext(UserPaymentContext);

  /*
   * NETWORK DROPDOWN
   * show on default whichever network has more transactions
   */
  const [network, setNetwork] = useState<string>(); //default network
  useEffect(() => {
    const ethLen = incomingRes.ethereumData?.paymentChanges?.length || 0;
    const baseLen = incomingRes.baseData?.paymentChanges?.length || 0;
    const fuseLen = incomingRes.fuseData?.paymentChanges?.length || 0;
    const neoLen = incomingRes.neoData?.paymentChanges?.length || 0;

    if (ethLen > baseLen && ethLen > fuseLen && ethLen > neoLen) {
      setNetwork("ethereum");
    } else if (baseLen > fuseLen && baseLen > neoLen) {
      setNetwork("base");
    } else if (fuseLen > neoLen) {
      setNetwork("fuse");
    } else {
      setNetwork("neo");
    }
  }, [incomingRes]);

  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const closeDropdown = () => {
    dropdownRef.current?.removeAttribute("open");
  };
  useOutsideClick(dropdownRef, closeDropdown);

  /**
   * ACTION: HANDLE PROFILE PAY SUCCESS
   **/
  const [hashRes, setHashRes] = useState();
  const handleProfilePaySuccess = (hash: any) => {
    console.log("/profile/username: handleProfilePaySuccess()");
    setHashRes(hash); // set transaction hash
    openPayReceiptModal(); // opens receipt
  };

  /**
   * ACTION: HANDLE RECEIPT MODAL
   **/
  const [isPayReceiptModalOpen, setPayReceiptModalOpen] = useState(false);

  const openPayReceiptModal = () => {
    setPayReceiptModalOpen(true);
  };

  const closePayReceiptModal = () => {
    setPayReceiptModalOpen(false);
  };

  /**
   * ACTION: HANDLE PROFILE PAY MODAL
   **/
  const [isProfilePayModalOpen, setProfilePayModalOpen] = useState(false);

  const openProfilePayModal = () => {
    if (isAuthenticated == "yes") setProfilePayModalOpen(true);
    else router.push("/login");
  };

  const closeProfilePayModal = () => {
    setProfilePayModalOpen(false);
  };

  // Rendering JSX
  if (!isLoadingUser && !profile?.id) {
    console.log("user not found");
    return <div className="mt-50">User not found</div>;
  }

  const networkData =
    network === "ethereum"
      ? incomingRes.ethereumData
      : network === "base"
      ? incomingRes.baseData
      : network === "fuse"
      ? incomingRes.fuseData
      : incomingRes.neoData;

  return (
    <>
      {/* PAY NOW */}
      <div className="mr-6 ml-6 z-10 relative">
        <button className="btn-primary btn w-full text-base" onClick={() => openProfilePayModal()}>
          Pay Now
        </button>
      </div>

      {/* PAY MODAL */}
      <ProfilePayModal
        isOpen={isProfilePayModalOpen}
        onClose={closeProfilePayModal}
        onSuccess={handleProfilePaySuccess}
      ></ProfilePayModal>

      {/* PAY RECEIPT MODAL */}
      {hashRes && (
        <ReceiptModal hash={hashRes} isOpen={isPayReceiptModalOpen} onClose={closePayReceiptModal}></ReceiptModal>
      )}

      {/* PAY TRANSACTIONS */}
      <div className="flex flex-col items-center profile z-10">
        <div className="w-full pl-6 pr-6 pb-3 pt-3 flex justify-center">
          <CardWithUsername username={profile.username} />
        </div>
        <div className="latest w-full rounded-t-2xl bg-slate-100 pt-6 drop-shadow-sm">
          <div className="flex justify-between font-semibold pb-2 pr-6 pl-6">
            <div>Payments ({networkData?.paymentChanges?.length || 0})</div>
            <details ref={dropdownRef} className="dropdown dropdown-end cursor-pointer">
              <summary className="flex text-neutral-600 hover:text-neutral-900">
                <div className="mr-1">Network</div>
                <ChevronDownIcon width={12} />
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li>
                  <div
                    className={`${network == "ethereum" && "bg-neutral-100"}`}
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
                    className={`${network == "base" && "bg-neutral-100"}`}
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
                    className={`${network == "fuse" && "bg-neutral-100"}`}
                    onClick={() => {
                      setNetwork("fuse");
                      closeDropdown();
                    }}
                  >
                    <FuseIcon />
                    Fuse
                  </div>
                </li>
                <li>
                  <div
                    className={`${network == "neo" && "bg-neutral-100"}`}
                    onClick={() => {
                      setNetwork("neo");
                      closeDropdown();
                    }}
                  >
                    {/* <NeoIcon /> */}
                    Neo
                  </div>
                </li>
              </ul>
            </details>
          </div>
          <div className="wildui-transaction-scroll-profile-view overflow-auto pr-6 pl-6 pb-10">
            {(!networkData?.paymentChanges?.length || networkData === undefined) && (
              <div className="flex h-full justify-center items-center">
                <div className="btn btn-neutral" onClick={openProfilePayModal}>
                  Make a first move 🥳
                </div>
              </div>
            )}
            <Transactions tx={networkData} hide="to" network={network} />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileUsername;
