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
      setHashRes(hash); // set transaction hash
    }, 2000);
    openPayReceiptModal(); // opens receipt
    router.refresh();
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
      <div className="mb-5 z-10 relative">
        <button
          className="btn-neutral btn w-full text-base custom-bg-blue border-0"
          onClick={() => openProfilePayModal()}
        >
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
      <div id="wildpay-profile" className="flex flex-col items-center profile mt-5 mb-5 z-10">
        <CardWithUsername username={publicProfile.username} />

        <div className="latest w-full wildui-transaction-scroll-profile-username overflow-auto">
          <Transactions tx={incomingTx} hide="to" />
        </div>
      </div>
    </>
  );
};
export default ProfileUsername;
