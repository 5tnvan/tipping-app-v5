"use client";

import React, { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { AppContext, PublicContext } from "~~/app/context";
import Tipping2 from "~~/components/app/pay/Tipping2";
import { CopyIcon } from "~~/components/assets/CopyIcon";
import TipsTable from "~~/components/subgraph/TipsTable";
import "~~/styles/app-profile.css";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";
import { useParams } from "next/navigation";
import { CardWithUsername } from "~~/components/app/CardWithUsername";

/**
 * ROUTE: /[username]
 * DESCRIPTION: Public Profile
 **/

const ProfileUsername: NextPage = ({ params }) => {
  //CONTEXTS
  const { isLoadingAuth, profile, refetchAuth } = useContext(AppContext);
  const { isLoadingPublic, publicProfile, refetchPublic } = useContext(PublicContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  // Use effect to refresh TipsTable when refetch is triggered
  useEffect(() => {
    // Call the TipsTable refresh logic here
    setRefetchTrigger(prev => prev + 1);
  }, [refetchAuth]);

  //On click Tip Now, show modal
  const handleTipNow = () => {
    setIsModalOpen(true);
  };

  if (!isLoadingPublic && !publicProfile?.id) {
    console.log("user not found");
    return <div className="mt-50">User not found</div>;
  }

  //rendering HTML
  return (
    <>
      {/* Pay Now */}
      <div className="mb-5 z-10 relative">
        <button className="btn-neutral btn w-full text-base custom-bg-blue border-0" onClick={() => handleTipNow()}>
          Pay Now
        </button>
      </div>
      <div id="wildpay-profile" className="flex flex-col items-center profile mt-5 mb-5 z-10">
        <dialog id="my_modal_3" className="modal" open={isModalOpen}>
          <div className="modal-box">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
              <div>@{publicProfile.username}</div>
              <div>{publicProfile.wallet_id}</div>

              <Tipping2 receiver={publicProfile.wallet_id} refetch={refetchAuth} />
            </form>
          </div>
        </dialog>

        <CardWithUsername username={publicProfile.username} />

        <div id="wildpay-profile-tx" className="latest w-full overflow-auto">
          {/* Refresh TipsTable by changing key when refetch is triggered */}
        <TipsTable receiverAddress={publicProfile.wallet_id} keyProp={refetchTrigger} />
        </div>
      </div>
    </>
  );
};
export default ProfileUsername;
