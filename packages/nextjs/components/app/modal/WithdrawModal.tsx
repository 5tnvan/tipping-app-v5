import React, { useContext } from "react";
import { Avatar } from "../authentication/Avatar";
import { useAccount } from "wagmi";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { AccountingContext, AppContext } from "~~/app/context";
import { EthIcon } from "~~/components/assets/EthIcon";
import { Address } from "~~/components/scaffold-eth/Address";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";
import { convertEthToUsd } from "~~/utils/app/functions/convertEthToUsd";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";

type Props = {
  isOpen: any;
  onClose: any;
};

export const WithdrawModal = ({ isOpen, onClose }: Props) => {
  const { profile } = useContext(AppContext);
  const { withdrawBalance, refetchAccounting } = useContext(AccountingContext);
  const nativeCurrencyPrice = useNativeCurrencyPrice();
  const { address: connectedAddress } = useAccount();

  /**
   * ACTION: Handle Close
   **/
  const handleClose = () => {
    onClose();
  };

  /**
   * ACTION: Handle Withdraw
   **/
  const handleWithdraw = (tx: any) => {
    onClose(tx);
    handleClose();
  };

  const { writeAsync: withdraw } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "withdraw",
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      handleWithdraw(txnReceipt.blockHash);
    },
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div className="wildui-modal-container w-full h-full top-0 left-0 fixed flex justify-center items-start z-100">
      <div className="wildui-modal-child flex flex-col text-black z-30 mt-4">
        {/* WITHDRAW FRAME */}
        <div className="modal-content grow rounded-lg">
          {/* WITHDRAW CLOSE */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
            ✕
          </button>
          {/* WITHDRAW INTO */}
          <div className="p-6">
            <div className="font-semibold text-3xl">{"Withdraw"}</div>
            <div className="mb-5">to your verified wallet</div>
            {!profile.wallet_id && withdrawBalance == 0 && (
              <>
                <div className="mb-2 flex items-align justify-center">
                  {`You don't have a verified wallet address`}. Try again later.
                </div>
                <div className="btn btn-secondary w-full" onClick={handleClose}>
                  Go Back
                </div>
              </>
            )}
            {profile.wallet_id && withdrawBalance == 0 && (
              <>
                <div className="mb-2 flex items-align justify-center">
                  Your balance is {withdrawBalance} ETH. Try again later.
                </div>
                <div className="btn btn-secondary w-full" onClick={handleClose}>
                  Go Back
                </div>
              </>
            )}
            {profile.wallet_id && withdrawBalance > 0 && (
              <>
                <div className="flex justify-between">
                  <div>ETH</div>
                  <div className="flex items-center text-xl">
                    <EthIcon width={16} height={16} />
                    {withdrawBalance}
                  </div>
                </div>
                <div className="flex justify-between mb-4">
                  <div>USD</div>
                  <div className="text-xl">(${convertEthToUsd(withdrawBalance, nativeCurrencyPrice)})</div>
                </div>
              </>
            )}
            {profile.wallet_id && withdrawBalance > 0 && profile.wallet_id == !connectedAddress && (
              <div className="flex btn btn-neutral h-full items-center justify-between pt-2 pb-2 mt-2">
                <div className="flex items-center">
                  <Avatar profile={profile} width="8" ring={false} />
                  <span className="ml-1 font-semibold">{profile.username}</span>
                </div>
                <div className="flex items-center">
                  <Address address={profile.wallet_id} />
                  <span className="text-neutral-600">
                    <CheckBadgeIcon width={16} />
                  </span>
                </div>
                <div className="w-full h-12 mt-2">
                  <RainbowKitCustomConnectButton btn={"base"} />
                </div>
              </div>
            )}
            {profile.wallet_id && withdrawBalance > 0 && profile.wallet_id == connectedAddress && (
              <div className="flex btn btn-neutral h-full items-center justify-between pt-2 pb-2 mt-2">
                <div className="flex items-center">
                  <Avatar profile={profile} width="8" ring={false} />
                  <span className="ml-1 font-semibold">{profile.username}</span>
                </div>
                <div className="flex items-center">
                  <Address address={profile.wallet_id} />
                  <span className="text-green-600">
                    <CheckBadgeIcon width={16} />
                  </span>
                </div>
              </div>
            )}
            {profile.wallet_id && withdrawBalance > 0 && profile.wallet_id !== connectedAddress && (
              <>
                <div className="flex btn btn-neutral h-full items-center justify-between pt-2 pb-2 mt-2">
                  <div className="flex items-center">
                    <Avatar profile={profile} width="8" ring={false} />
                    <span className="ml-1 font-semibold">{profile.username}</span>
                  </div>
                  <div className="flex items-center">
                    <Address address={connectedAddress} />
                    <span className="text-red-600">
                      <CheckBadgeIcon width={16} />
                    </span>
                  </div>
                </div>
                <div className="text-center text-red-600 mt-2">{`Your connected address doesn't match your verified address.`}</div>
              </>
            )}
            {/* Confirm */}
            {profile.wallet_id && withdrawBalance > 0 && profile.wallet_id == connectedAddress && (
              <div
                className="btn btn-accent bg-gradient-to-r from-cyan-600 via-lime-500 border-0 text-black w-full mt-3"
                onClick={() => withdraw()}
              >
                Withdraw
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
