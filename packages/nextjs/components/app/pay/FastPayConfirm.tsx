import React, { useContext, useState } from "react";
import Link from "next/link";
import { Avatar } from "../authentication/Avatar";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { AppContext } from "~~/app/context";
import { Address } from "~~/components/scaffold-eth/Address";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth/useNativeCurrencyPrice";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";
import { convertUsdToEth } from "~~/utils/app/functions/convertUsdToEth";

type Props = {
  receiver: any;
  onSuccess: any;
};

const FastPayConfirm = ({ receiver, onSuccess }: Props) => {
  //PARENTS CONTEXT:
  const { profile } = useContext(AppContext);
  const { address: connectedAddress } = useAccount();

  //const [ethAmount, setEthAmount] = useState(0);
  const [ethAmountWithFee, setEthAmountWithFee] = useState(0);
  const [dollarAmount, setDollarAmount] = useState(0);
  const [dollarAmountWithFee, setDollarAmountWithFee] = useState(0);
  const [addMessage, setAddMessage] = useState(false);
  const [message, setMessage] = useState("n/a");
  const nativeCurrencyPrice = useNativeCurrencyPrice();

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
    const ethAmount = convertUsdToEth(dollarAmount, nativeCurrencyPrice);
    setDollarAmount(dollarAmount);
    setDollarAmountWithFee(dollarAmount + (dollarAmount * 3) / 100);
    //setEthAmount(ethAmount);
    setEthAmountWithFee(ethAmount + (ethAmount * 3) / 100);
  };

  /**
   * ACTION: Trigger parents on success
   **/
  const handlePay = (hash: any) => {
    onSuccess(hash);
  };

  /**
   * ACTION: Pay
   **/
  const { writeAsync: pay } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setPayment",
    args: [receiver, message],
    value: parseEther(ethAmountWithFee.toString()),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.transactionHash);
      handlePay(txnReceipt.transactionHash);
    },
  });

  return (
    <>
      <div id="wildpay-fastpay" className="flex items-center pt-10 text-5xl">
        {/* USD */}
        <span className="text-3xl">$</span>
        <div>
          <input type="number" placeholder="0.00" className="text-center custom-text-blue" onChange={handleInput} />
        </div>
        <span className="text-3xl">USD</span>
      </div>
      {/* ETH */}
      {dollarAmount > 0 && (
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
            <div>{`${ethAmountWithFee} ETH`}</div>
          </div>
        </div>
      )}

      {/* PAY AS */}
      <div className="mt-10">
        {!profile.wallet_id && (
          <>
            <div>You have no verified wallet, yet.</div>
            <div className="flex justify-center">
              <Link href="/settings" className="btn btn-secondary w-full mt-3">
                Go to Settings
              </Link>
            </div>
          </>
        )}
        {profile.wallet_id && !connectedAddress && (
          <>
            <div className="flex btn btn-secondary h-full items-center justify-between pt-2 pb-2 mt-2">
              <div className="flex items-center">
                <Avatar profile={profile} width="8" ring={false} />
                <span className="ml-1 font-semibold">{profile.username}</span>
              </div>
              <div className="flex">
                <Address address={profile.wallet_id} />
                <CheckBadgeIcon width={16} />
              </div>
            </div>
            <div className="w-full h-12 mt-2">
              <RainbowKitCustomConnectButton />
            </div>
          </>
        )}
        {profile.wallet_id && connectedAddress && profile.wallet_id == connectedAddress && (
          <>
            <div className="flex btn btn-secondary h-full items-center justify-between pt-2 pb-2 mt-2">
              <div className="flex items-center">
                <Avatar profile={profile} width="8" ring={false} />
                <span className="ml-1 font-semibold">{profile.username}</span>
              </div>
              <div className="flex items-center">
                <Address address={connectedAddress} />
                <span className="text-green-600">
                  <CheckBadgeIcon width={16} />
                </span>
              </div>
            </div>
          </>
        )}
        {profile.wallet_id && connectedAddress && profile.wallet_id !== connectedAddress && (
          <>
            <div className="flex btn btn-secondary h-full items-center justify-between pt-2 pb-2 mt-2">
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
            <div className="flex justify-center">
              <Link href="/settings" className="btn btn-secondary w-full mt-3">
                Reconnect
              </Link>
            </div>
          </>
        )}
      </div>

      {/* CONFIRM */}
      {profile.wallet_id && connectedAddress && profile.wallet_id == connectedAddress && (
        <>
          {/* BUTTON */}
          <div className="flex justify-center">
            <button
              className="btn btn-accent bg-gradient-to-r from-cyan-600 via-lime-500 border-0 text-black w-full mt-3"
              onClick={() => pay()}
            >
              Confirm
            </button>
          </div>
          {/* MESSAGE */}
          <div className="flex flex-col items-center mt-2">
            <span className="link-secondary block mt-2" onClick={() => addMessageClick()}>
              Leave a message
            </span>
            {addMessage && (
              <input
                type="text"
                placeholder="Type your message"
                className="input block input-bordered input-secondary w-full mt-2"
                onChange={e => onMessageChange(e)}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default FastPayConfirm;
