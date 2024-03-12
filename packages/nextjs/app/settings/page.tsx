"use client";

import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import { AppContext } from "~~/app/context";
import { IsLoading } from "~~/components/app/IsLoading";
import WalletConnectVerify from "~~/components/app/wallet/WalletConnectVerify";
import { Address } from "~~/components/scaffold-eth/Address";
import PayIncomingTransactionsSum from "~~/components/subgraph/PayIncomingTransactionsSum";
import "~~/styles/app-profile.css";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const Settings: NextPage = () => {
  const router = useRouter();
  const [buttonText, setButtonText] = useState("");
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const { isLoadingAuth, isAuth, user, profile, refetchAuth } = useContext(AppContext);

  useEffect(() => {
    if (!profile.wallet_id) {
      setButtonText("Connect Wallet");
    } else if (profile.wallet_id && !profile.wallet_sign_hash) {
      setButtonText("Verify Wallet");
    } else {
      setButtonText("Withdraw");
    }
  }, [profile.wallet_id, profile.wallet_sign_hash]);

  // useEffect(() => {

  // }, [isWalletModalOpen]);

  //WALLET
  const handleWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  //WITHDRAW
  const handleWithdrawModal = () => {
    setIsWithdrawModalOpen(true);
  };

  const handleModal = !profile.wallet_id || !profile.wallet_sign_hash ? handleWalletModal : handleWithdrawModal;

  /* ROUTE */
  if (isAuth == "no") {
    router.push("/login");
  }

  if (isAuth == "yes") {
    return (
      <>
        <div id="wildpay-is-auth-settings" className="profile mt-5 mb-5 z-10">
          {/* CTA BUTTON */}
          <div id="wildpay-is-auth-cta" className="mb-5 z-10 relative">
            <button className="btn-neutral btn w-full text-base custom-bg-blue border-0" onClick={handleModal}>
              {isLoadingAuth ? <IsLoading shape="rounded-md" width={28} height={6} /> : buttonText}
            </button>
          </div>

          {/* My Account */}
          <div className="mb-3">My Account</div>

          {/* Email */}
          <div className="mb-3">
            <label className="input input-bordered flex justify-between gap-2 pr-0">
              <div className="opacity-70 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                </svg>
                <div className="grow">{user?.email || ""}</div>
              </div>
              {/* <button className="btn btn-secondary" onClick={() => handleSwitch("youtube")}>
                {profile.youtube !== null ? "Edit" : "Add"}
              </button> */}
            </label>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="input input-bordered flex justify-between gap-2 pr-0">
              <div className="opacity-70 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-key"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
                  <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
                <input type="text" className="grow bg-white" placeholder="******" disabled />
              </div>
              <button className="btn btn-secondary" onClick={() => handleSwitch("youtube")}>
                Reset
              </button>
            </label>
          </div>

          {/* My Wallet */}
          <div className="mb-3">My Wallet</div>

          {/* Wallet */}
          <div className="mb-3">
            <label className="input input-bordered flex justify-between gap-2 pr-0">
              <div className="opacity-70 flex items-center gap-2">
                {profile?.wallet_id ? <Address address={profile?.wallet_id} /> : "n/a"}
                {/* <Address address={profile?.wallet_id} /> */}
              </div>
              <button className="btn btn-secondary" onClick={() => handleWalletModal()}>
                {profile?.wallet_id && !profile?.wallet_sign_hash ? "Verify" : ""}
                {profile?.wallet_sign_hash && "Change"}
                {!profile?.wallet_id && !profile?.wallet_sign_hash && "Connect"}
              </button>
            </label>
          </div>

          {/* Wallet Modal */}
          <dialog id="my_modal_3" className="modal" open={isWalletModalOpen}>
            <div className="modal-box p-10 pt-15">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => setIsWalletModalOpen(false)}
                >
                  ✕
                </button>
                <WalletConnectVerify />
              </form>
            </div>
          </dialog>

          {/* My Balance */}
          <div className="mb-3">My Balance</div>

          {/* Balance */}
          <div className="mb-3">
            <label className="input input-bordered flex justify-between gap-2 pr-0">
              <div className="opacity-70 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="m12 1.75l-6.25 10.5L12 16l6.25-3.75zM5.75 13.5L12 22.25l6.25-8.75L12 17.25z"
                  ></path>
                </svg>
                <PayIncomingTransactionsSum receiverAddress={profile.wallet_id} />Ξ
              </div>
              <button className="btn btn-secondary" onClick={() => handleWithdrawModal()}>
                Widthdraw
              </button>
            </label>
          </div>

          {/* Balance Modal */}
          <dialog id="my_modal_4" className="modal" open={isWithdrawModalOpen}>
            <div className="modal-box p-10 pt-15">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => setIsWithdrawModalOpen(false)}
                >
                  ✕
                </button>
                <div>Withdraw confirm</div>
              </form>
            </div>
          </dialog>
        </div>
      </>
    );
  }
};

export default Settings;
