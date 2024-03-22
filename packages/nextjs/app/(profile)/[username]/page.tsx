"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import { ProfilePayContext, PublicAccountingContext, PublicContext } from "~~/app/context";
import { CardWithUsername } from "~~/components/app/CardWithUsername";
import Transactions from "~~/components/app/accounting/Transactions";
import { ProfilePayModal } from "~~/components/app/modal/ProfilePayModal";
import { ReceiptModal } from "~~/components/app/modal/ReceiptModal";
import "~~/styles/app-profile.css";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

/**
 * ROUTE: /[username]
 * DESCRIPTION: Public Profile
 **/

const ProfileUsername: NextPage = () => {
  const router = useRouter();
  //CONTEXTS
  const { isLoadingPublic, publicProfile } = useContext(PublicContext);
  const { incomingTx } = useContext(PublicAccountingContext);
  const { setProfilePaySuccess } = useContext(ProfilePayContext);
  const [hashRes, setHashRes] = useState();

  const handleProfilePaySuccess = (hash: any) => {
    console.log("/profile/username: handleProfilePaySuccess()");
    setTimeout(() => {
      setProfilePaySuccess(true); //trigger isPublicLayout
      router.refresh();
      setHashRes(hash); // set transaction hash
      openPayReceiptModal(); // opens receipt
    }, 1000);
  };

  /**
   * ACTION: Open close receipt modal
   **/
  const [isPayReceiptModalOpen, setPayReceiptModalOpen] = useState(false);

  const openPayReceiptModal = () => {
    setPayReceiptModalOpen(true);
  };

  const closePayReceiptModal = () => {
    setPayReceiptModalOpen(false);
  };

  /**
   * ACTION: Open close profile modal
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
          <div className="font-semibold pb-2 pr-6 pl-6">Received: </div>
          <div className="wildui-transaction-scroll-profile-view overflow-auto pr-6 pl-6 ">
            <Transactions tx={incomingTx} hide="to" />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileUsername;
