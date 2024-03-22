"use client";

import React, { useEffect, useState } from "react";
import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { AccountingContext, AppContext, WithdrawContext } from "~~/app/context";
import { IsLoading } from "~~/components/app/IsLoading";
import { WalletModal } from "~~/components/app/modal/WalletModal";
import { WithdrawModal } from "~~/components/app/modal/WithdrawModal";
import { EthIcon } from "~~/components/assets/EthIcon";
import { Address } from "~~/components/scaffold-eth/Address";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth/useNativeCurrencyPrice";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";
import "~~/styles/app-profile.css";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";
import { convertEthToUsd } from "~~/utils/app/functions/convertEthToUsd";
import { WithdrawReceipt } from "~~/components/app/modal/WithdrawReceipt";

const Settings: NextPage = () => {
  const router = useRouter();
  const nativeCurrencyPrice = useNativeCurrencyPrice();
  const [buttonText, setButtonText] = useState("");
  const { isLoadingAuth, isAuth, user, profile } = useContext(AppContext);
  const { withdrawBalance, refetchAccounting } = useContext(AccountingContext);
  const { setWithdrawSuccess } = useContext(WithdrawContext);
  const { address } = useAccount();

  useEffect(() => {
    if (!profile.wallet_id && !address) {
      setButtonText("Connect Wallet");
    } else if (address && !profile.wallet_sign_hash) {
      setButtonText("Verify Wallet");
    } else {
      setButtonText("Withdraw");
    }
  }, [address, profile.wallet_id, profile.wallet_sign_hash]);

  /**
   * ACTION: Handle wallet verify
   **/
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);

  const handleWalletModal = () => {
    openWalletModal();
  };

  const openWalletModal = () => {
    setWalletModalOpen(true);
  };

  const closeWalletModal = () => {
    setWalletModalOpen(false);
  };

  /**
   * ACTION: Handle withdraw
   **/
  const [tx, setTx] = useState("");
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);

  const handleWithdrawModal = () => {
    openWithdrawModal();
  };

  const openWithdrawModal = () => {
    setWithdrawModalOpen(true);
  };

  const closeWithdrawModal = () => {
    setWithdrawModalOpen(false);
  };

  const handleWithdrawSuccess = (tx: any) => {
    if (tx) {
      closeWithdrawModal(); // close withdraw modal
      setWithdrawSuccess(true); //trigger isAuthLayout
      setTimeout(() => {
        console.log("withdraw tx +  router.refresh", tx);
        setTx(tx);
        openWithdrawReceipt();
        router.refresh();
      }, 2000);
    } else {
      closeWithdrawModal();
    }
  };

  /**
   * ACTION: Handle withdraw receipt
   **/
  const [isWithdrawReceiptOpen, setWithdrawReceiptOpen] = useState(false);

  const openWithdrawReceipt = () => {
    setWithdrawReceiptOpen(true);
  };

  const closeWithdrawReceipt = () => {
    setWithdrawModalOpen(false);
  };

  const handleModal = !profile.wallet_id || !profile.wallet_sign_hash ? handleWalletModal : handleWithdrawModal;

  /* ROUTE */
  if (isAuth == "no") {
    return (
      <div id="wildpay-is-not-auth" className="z-10 pt-28">
        <div className="font-semibold text-3xl mb-5">{"You are not logged in."}</div>
        <Link href="/login" className="btn text-base mb-3 w-full">
          {"Go to login"}
        </Link>
      </div>
    );
  }

  if (isAuth == "yes") {
    return (
      <>
        <div id="wildpay-is-auth-settings" className="profile mt-5 mb-5 ml-6 mr-6 z-10">
          {/* CTA BUTTON */}
          <div id="wildpay-cta" className="mb-5 z-1 relative">
            <button className="btn-primary btn w-full text-base" onClick={handleModal}>
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
            </label>
          </div>

          {/* My Wallet */}
          <div className="mb-3">My Verified Wallet</div>

          {/* Wallet */}
          <div className="mb-3">
            <label className="input input-bordered flex justify-between gap-2 pr-0">
              <div className="opacity-70 flex items-center gap-2">
                {profile?.wallet_id ? (
                  <>
                    <Address address={profile?.wallet_id} />
                    <CheckBadgeIcon width="20" />
                  </>
                ) : (
                  "No Wallet"
                )}
                {/* <Address address={profile?.wallet_id} /> */}
              </div>
              <button className="btn btn-accent" onClick={() => handleWalletModal()}>
                {address && !profile?.wallet_sign_hash ? "Verify" : ""}
                {profile?.wallet_sign_hash && "View"}
                {!address && !profile?.wallet_sign_hash && "Connect"}
              </button>
            </label>
          </div>
          {/* Wallet Modal */}
          <WalletModal isOpen={isWalletModalOpen} onClose={closeWalletModal}></WalletModal>

          {/* My Balance */}
          <div className="mb-3">My Balance</div>

          {/* Balance */}
          <div className="mb-3">
            <label className="input input-bordered flex justify-between gap-2 pr-0">
              <div className="opacity-70 flex items-center gap-1">
                <EthIcon width={16} height={16} />
                {withdrawBalance == 0 || withdrawBalance > 0 ? (
                  <>
                    <span className="font-medium">{Number(withdrawBalance).toFixed(4)}Ξ</span>
                    <span className="">(${convertEthToUsd(withdrawBalance, nativeCurrencyPrice)})</span>
                  </>
                ) : (
                  <>No balance</>
                )}
              </div>
              {(withdrawBalance == 0 || withdrawBalance > 0) && (
                <>
                  <button className="btn btn-accent" onClick={handleWithdrawModal}>
                    Withdraw
                  </button>
                </>
              )}
            </label>
          </div>

          {/* Withdraw Modal */}
          <WithdrawModal isOpen={isWithdrawModalOpen} onClose={handleWithdrawSuccess}></WithdrawModal>

          {/* Withdraw Receipt */}
          <WithdrawReceipt tx={tx} isOpen={isWithdrawReceiptOpen} onClose={closeWithdrawReceipt}></WithdrawReceipt>
        </div>
      </>
    );
  }
};

export default Settings;
