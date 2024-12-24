import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Avatar } from "../authentication/Avatar";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { AuthUserContext } from "~~/app/context";
import { Address } from "~~/components/scaffold-eth/Address";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";
import { RainbowKitCustomSwitchNetworkButton } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton/switchnetwork";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";
import { convertUsdToEth } from "~~/utils/app/functions/convertUsdToEth";

type Props = {
  receiver: any;
  onSuccess: any;
  onClose: any;
};

const FastPayConfirm = ({ receiver, onSuccess, onClose }: Props) => {
  const { address: connectedAddress } = useAccount();
  const { profile } = useContext(AuthUserContext);
  const [tokenAmountWithFee, setTokenAmountWithFee] = useState(0);
  const [dollarAmount, setDollarAmount] = useState(0);
  const [dollarAmountWithFee, setDollarAmountWithFee] = useState(0);
  const [addMessage, setAddMessage] = useState(false);
  const [message, setMessage] = useState("n/a");
  const ethPrice = useGlobalState(state => state.nativeCurrencyPrice);
  const fusePrice = useGlobalState(state => state.fuseCurrencyPrice);
  const neoPrice = useGlobalState(state => state.neoCurrencyPrice);

  console.log("fusePrice", fusePrice);
  console.log("ethPrice", ethPrice);
  console.log("neoPrice", neoPrice);

  /**
   * ACTION: Get network
   **/
  const [network, setNetwork] = useState("");
  const { targetNetwork } = useTargetNetwork();

  useEffect(() => {
    if (targetNetwork.id == 84532 || targetNetwork.id == 8453) {
      setNetwork("base");
    } else if (targetNetwork.id == 11155111 || targetNetwork.id == 1) {
      setNetwork("ethereum");
    } else if (targetNetwork.id == 122 || targetNetwork.id == 123) {
      setNetwork("fuse");
    } else if (targetNetwork.id == 47763 || targetNetwork.id == 12227332) {
      setNetwork("neo");
    }
  }, [targetNetwork]);

  console.log("network", network);

  /**
   * ACTION: Add message
   **/
  const addMessageClick = () => {
    if (addMessage == false) {
      setAddMessage(true);
    } else {
      setAddMessage(false);
    }
  };

  const onMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  /**
   * ACTION: Show billing
   **/
  const handleInput = (e: any) => {
    const dollarAmount = Number(e.target.value);
    if (network == "ethereum" || network == "base") {
      const ethAmount = convertUsdToEth(dollarAmount, ethPrice);
      setDollarAmount(dollarAmount);
      setDollarAmountWithFee(dollarAmount + (dollarAmount * 3) / 100);
      setTokenAmountWithFee(ethAmount + (ethAmount * 3) / 100);
    } else if (network == "fuse") {
      const fuseAmount = convertUsdToEth(dollarAmount, fusePrice);
      setDollarAmount(dollarAmount);
      setDollarAmountWithFee(dollarAmount + (dollarAmount * 3) / 100);
      setTokenAmountWithFee(fuseAmount + (fuseAmount * 3) / 100);
    } else if (network == "neo") {
      const neoAmount = convertUsdToEth(dollarAmount, neoPrice);
      setDollarAmount(dollarAmount);
      setDollarAmountWithFee(dollarAmount + (dollarAmount * 3) / 100);
      setTokenAmountWithFee(neoAmount + (neoAmount * 3) / 100);
    }
  };

  /**
   * ACTION: Trigger parents on success
   **/
  const handlePay = (hash: any) => {
    console.log("FastPayConfirm: trigger FastPayModal");
    onSuccess(hash);
  };

  /**
   * ACTION: Pay
   **/
  const { writeAsync: pay, isMining } = useScaffoldContractWrite({
    contractName: "WildpayEthContract",
    functionName: "setPayment",
    args: [receiver, message],
    value: parseEther(tokenAmountWithFee.toString()),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("FastPayConfirm trasactionHash", txnReceipt.transactionHash);
      handlePay(txnReceipt.transactionHash);
    },
  });

  return (
    <>
      <div id="wildpay-fastpay" className="flex items-center pt-4 text-5xl">
        {/* USD */}
        <span className="text-3xl">$</span>
        <div>
          <input
            type="number"
            placeholder="0.00"
            className="text-center custom-text-blue bg-white"
            onChange={handleInput}
          />
        </div>
        <span className="text-3xl">USD</span>
      </div>
      {/* ETH */}
      {dollarAmount > 0 && (
        <>
          {/* MESSAGE */}
          <div className="flex flex-col items-center">
            <Link className="link-primary block mt-2" onClick={() => addMessageClick()} href={""}>
              Leave a message
            </Link>
            {addMessage && (
              <input
                type="text"
                placeholder="Type your message"
                className="input block input-bordered input-primary w-full mt-2"
                onChange={e => onMessageChange(e)}
              />
            )}
          </div>
          {/* BILL */}
          <div className="">
            <div className="flex justify-between border-b pt-8 pb-3 mb-3">
              <div>Amount</div>
              <div className="font-semibold">${dollarAmount}</div>
            </div>
            <div className="flex justify-between">
              <div className="pb-1">Total Bill</div>
              <div className="font-semibold">{`$${dollarAmountWithFee}`}</div>
            </div>
            <div className="flex justify-end">
              <div>{`${tokenAmountWithFee.toFixed(4)} ${
                network === "fuse" ? "FUSE" : network === "neo" ? "GAS" : "ETH"
              }`}</div>
            </div>
          </div>
        </>
      )}

      {/* PAY AS */}
      <div className="mt-8">
        {!profile.wallet_id && (
          <>
            <div>You have no verified wallet, yet.</div>
            <div className="flex justify-center">
              <Link href="/settings" className="btn btn-neutral w-full mt-3" onClick={onClose}>
                Verify a Wallet
              </Link>
            </div>
          </>
        )}
        {profile.wallet_id && !connectedAddress && (
          <>
            <div className="flex btn btn-neutral h-full items-center justify-between pt-2 pb-2 mt-2">
              <div className="flex items-center">
                <Avatar profile={profile} width={8} ring={8} height={8} border={0} gradient={undefined} />
                <span className="ml-1 font-semibold">{profile.username}</span>
              </div>
              <div className="flex items-center">
                <Address address={profile.wallet_id} />
                <span className="text-neutral-600 ml-1">
                  <CheckCircleIcon width={16} />
                </span>
              </div>
            </div>
            <div className="w-full h-12 mt-2">
              <RainbowKitCustomConnectButton btn="base" />
            </div>
          </>
        )}
        {profile.wallet_id && connectedAddress && profile.wallet_id == connectedAddress && (
          <>
            <RainbowKitCustomSwitchNetworkButton btn="base" />
            <div className="flex btn btn-neutral h-full items-center justify-between pt-2 pb-2 mt-2 mb-2">
              <div className="flex items-center">
                <Avatar profile={profile} width={8} ring={8} height={8} border={0} gradient={undefined} />
                <span className="ml-2 font-semibold">{profile.username}</span>
              </div>
              <div className="flex items-center">
                <Address address={connectedAddress} />
                <span className="text-green-600 ml-1">
                  <CheckCircleIcon width={16} />
                </span>
              </div>
            </div>
          </>
        )}
        {profile.wallet_id && connectedAddress && profile.wallet_id !== connectedAddress && (
          <>
            <div className="flex btn btn-neutral h-full items-center justify-between pt-2 pb-2 mt-2">
              <div className="flex items-center">
                <Avatar
                  profile={profile}
                  width="8"
                  ring={false}
                  height={undefined}
                  border={undefined}
                  gradient={undefined}
                />
                <span className="ml-2 font-semibold">{profile.username}</span>
              </div>
              <div className="flex items-center">
                <Address address={connectedAddress} />
                <span className="text-red-600 ml-1">
                  <ExclamationCircleIcon width={16} />
                </span>
              </div>
            </div>
            <div className="text-center text-red-600 mt-2">{`Your connected address doesn't match your verified address.`}</div>
          </>
        )}
      </div>

      {/* CONFIRM */}
      {profile.wallet_id && connectedAddress && profile.wallet_id == connectedAddress && (
        <>
          <div className="flex justify-center">
            <button
              className={`${
                dollarAmount === 0 && "btn-disabled"
              } btn btn-accent bg-gradient-to-r from-cyan-600 via-lime-500 border-0 text-black w-full mt-3`}
              onClick={() => pay()}
            >
              Confirm
              {isMining && <span className="loading loading-ring loading-md"></span>}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default FastPayConfirm;
