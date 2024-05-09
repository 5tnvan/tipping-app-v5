import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "../authentication/Avatar";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { AuthUserContext } from "~~/app/context";
import { Address } from "~~/components/scaffold-eth/Address";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";
import { RainbowKitCustomSwitchNetworkButton } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton/switchnetwork";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";
import { useFetchBalance } from "~~/utils/app/fetch/fetchBalance";
import { convertEthToUsd } from "~~/utils/app/functions/convertEthToUsd";
import { useGlobalState } from "~~/services/store/store";

type Props = {
  isOpen: any;
  onClose: any;
};

export const WithdrawModal = ({ isOpen, onClose }: Props) => {
  const { profile } = useContext(AuthUserContext);
  const price = useGlobalState(state => state.nativeCurrencyPrice);
  const { address: connectedAddress } = useAccount();
  const [ethAmount, setEthAmount] = useState(0);
  const [dollarAmount, setDollarAmount] = useState(0);
  const [confirm, setConfirm] = useState("btn-disabled");

  /* WITHDRAW BALANCE */
  const [wallet, setWallet] = useState("0x93814dC4F774f719719CAFC9C9E7368cb343Bd0E"); //dummy initial wallet
  const [withdrawBalance, setWithdrawBalance] = useState<any>();
  const balanceRes = useFetchBalance(wallet);

  useEffect(() => {
    if (profile.wallet_id) {
      setWallet(profile.wallet_id);
      setWithdrawBalance(balanceRes);
    }
  }, [balanceRes, profile.wallet_id]);

  /**
   * ACTION: Handle Close
   **/
  const handleClose = () => {
    onClose();
  };

  /**
   * ACTION: Show billing
   **/
  const handleInput = (e: any) => {
    const ethAmount = Number(e.target.value);
    const dollarAmount = convertEthToUsd(ethAmount, price);
    setEthAmount(ethAmount);
    setDollarAmount(dollarAmount);

    if (e.target.value == 0 || e.target.value > withdrawBalance) {
      setConfirm("btn-disabled");
    } else {
      setConfirm("");
    }
  };

  /**
   * ACTION: Handle Withdraw
   **/
  const handleWithdraw = (tx: any) => {
    onClose(tx);
    handleClose();
  };

  const { writeAsync: withdraw, isMining } = useScaffoldContractWrite({
    contractName: "WildpayEthContract",
    functionName: "withdraw",
    args: [parseEther(ethAmount.toString())],
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction transactionHash", txnReceipt.transactionHash);
      handleWithdraw(txnReceipt.transactionHash);
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
                {/* BALANCE AMOUNT */}
                <div className="flex items-center">
                  <div className="font-semibold mr-1">Your balance</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center text-xl mr-2 font-medium">{Number(withdrawBalance)}Ξ</div>
                  <div className="text-xl text-neutral-700">
                    (${convertEthToUsd(withdrawBalance, price).toFixed(2)})
                  </div>
                </div>
                {/* WITHDRAW AMOUNT */}
                <div id="wildpay-withdraw" className="flex items-center pt-5 pb-3 text-5xl">
                  <span className="text-3xl">Ξ</span>
                  <div>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="text-center custom-text-blue bg-white"
                      onChange={handleInput}
                    />
                  </div>
                  <span className="text-3xl">ETH</span>
                </div>
                {dollarAmount > 0 && (
                  <>
                    {/* BILL */}
                    <div className="mb-5">
                      <div className="flex justify-between border-t pt-3">
                        <div className="pb-1">Withdraw Amount</div>
                        <div className="font-semibold">{`${ethAmount}`} ETH</div>
                      </div>
                      <div className="flex justify-end font-semibold">
                        <div>{`$${dollarAmount}`}</div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
            {profile.wallet_id && withdrawBalance > 0 && !connectedAddress && (
              <>
                <div className="flex btn btn-neutral h-full items-center justify-between pt-2 pb-2 mt-2">
                  <div className="flex items-center">
                    <Avatar profile={profile} width="8" ring={8} height={8} border={0} gradient={undefined} />
                    <span className="ml-1 font-semibold">{profile.username}</span>
                  </div>
                  <div className="flex items-center">
                    <Address address={profile.wallet_id} />
                    <span className="text-neutral-600">
                      <CheckCircleIcon width={16} />
                    </span>
                  </div>
                </div>
                <div className="w-full h-12 mt-2">
                  <RainbowKitCustomConnectButton btn={"base"} />
                </div>
              </>
            )}
            {profile.wallet_id && withdrawBalance > 0 && connectedAddress && profile.wallet_id == connectedAddress && (
              <>
                <div className="mt-2">
                  <RainbowKitCustomSwitchNetworkButton btn="base" />
                </div>
                <div className="flex btn btn-neutral h-full items-center justify-between pt-2 pb-2 mt-2">
                  <div className="flex items-center">
                    <Avatar profile={profile} width="8" ring={8} height={8} border={0} gradient={undefined} />
                    <span className="ml-1 font-semibold">{profile.username}</span>
                  </div>
                  <div className="flex items-center">
                    <Address address={profile.wallet_id} />
                    <span className="text-green-600 ml-1">
                      <CheckCircleIcon width={16} />
                    </span>
                  </div>
                </div>
              </>
            )}
            {profile.wallet_id && withdrawBalance > 0 && connectedAddress && profile.wallet_id !== connectedAddress && (
              <>
                <div className="flex btn btn-neutral h-full items-center justify-between pt-2 pb-2 mt-2">
                  <div className="flex items-center">
                    <Avatar profile={profile} width="8" ring={false} height={undefined} border={undefined} gradient={undefined} />
                    <span className="ml-1 font-semibold">{profile.username}</span>
                  </div>
                  <div className="flex items-center">
                    <Address address={connectedAddress} />
                    <span className="text-red-600 ml-1">
                      <CheckCircleIcon width={16} />
                    </span>
                  </div>
                </div>
                <div className="text-center text-red-600 mt-2">{`Your connected address doesn't match your verified address.`}</div>
              </>
            )}
            {/* Confirm */}
            {profile.wallet_id && withdrawBalance > 0 && profile.wallet_id == connectedAddress && (
              <div
                className={`btn btn-accent ${confirm} bg-gradient-to-r from-cyan-600 via-lime-500 border-0 text-black w-full mt-3`}
                onClick={() => withdraw()}
              >
                Withdraw
                {isMining && <span className="loading loading-ring loading-md"></span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
