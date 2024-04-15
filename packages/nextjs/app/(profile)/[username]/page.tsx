"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import { PublicContext } from "~~/app/context";
import { CardWithUsername } from "~~/components/app/CardWithUsername";
import Transactions from "~~/components/app/accounting/Transactions";
import { ProfilePayModal } from "~~/components/app/modal/ProfilePayModal";
import { ReceiptModal } from "~~/components/app/modal/ReceiptModal";
import { BaseIcon } from "~~/components/assets/BaseIcon";
import { EthIcon } from "~~/components/assets/EthIcon";
import { useOutsideClick } from "~~/hooks/scaffold-eth/useOutsideClick";
import "~~/styles/app-profile.css";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";
import { useIncomingTransactions } from "~~/utils/app/fetch/fetchIncomingTransactions";
import { useOutgoingTransactions } from "~~/utils/app/fetch/fetchOutgoingTransactions";

/**
 * ROUTE: /[username]
 * DESCRIPTION: Public Profile
 **/

const ProfileUsername: NextPage = () => {
  /* USER VARIABLES */
  const { isLoadingPublic, publicProfile } = useContext(PublicContext);

  /* TRANSACTIONS VARIABLES */
  const [incomingEthTx, setIncomingEthTx] = useState<any>();
  const [incomingBaseTx, setIncomingBaseTx] = useState<any>();

  /* FETCH TRANSACTIONS */
  const incomingRes = useIncomingTransactions(publicProfile.wallet_id);
  const outgoingRes = useOutgoingTransactions(publicProfile.wallet_id);

  useEffect(() => {
    setIncomingEthTx(incomingRes.ethereumData);
    setIncomingBaseTx(incomingRes.baseData);
  }, [incomingRes, outgoingRes]);

  /* NETWORK DROPDOWN */
  const [network, setNetwork] = useState<string>(); //default network
  useEffect(() => {
    if (incomingEthTx?.paymentChanges?.length > incomingBaseTx?.paymentChanges?.length) {
      setNetwork("ethereum");
    } else {
      setNetwork("base");
    }
  }, [incomingEthTx, incomingBaseTx]);
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
    setProfilePayModalOpen(true);
  };

  const closeProfilePayModal = () => {
    setProfilePayModalOpen(false);
  };

  //rendering jsx
  if (!isLoadingPublic && !publicProfile?.id) {
    console.log("user not found");
    return <div className="mt-50">User not found</div>;
  }

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
        {/* Scroll Snap */}
        <div className="w-full pl-6 pr-6 pb-3 pt-3 flex justify-center">
          <CardWithUsername username={publicProfile.username} />
        </div>
        <div className="latest w-full rounded-t-2xl bg-slate-100 pt-6 drop-shadow-sm">
          <div className="flex justify-between font-semibold pb-2 pr-6 pl-6">
            <div>
              Payments ({(network === "ethereum" ? incomingEthTx : incomingBaseTx) == undefined && 0}
              {(network === "ethereum" ? incomingEthTx : incomingBaseTx)?.paymentChanges?.length})
            </div>
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
              </ul>
            </details>
          </div>
          <div className="wildui-transaction-scroll-profile-view overflow-auto pr-6 pl-6 pb-10">
            {((network === "ethereum" ? incomingEthTx : incomingBaseTx)?.paymentChanges?.length === 0 ||
              (network === "ethereum" ? incomingEthTx : incomingBaseTx) === undefined) && (
              <div className="flex h-full justify-center items-center">
                <div className="btn btn-neutral">Make a first move 🥳</div>
              </div>
            )}
            <Transactions
              tx={network === "ethereum" ? incomingEthTx : incomingBaseTx}
              hide="to"
              network={network === "ethereum" ? "ethereum" : "base"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileUsername;
