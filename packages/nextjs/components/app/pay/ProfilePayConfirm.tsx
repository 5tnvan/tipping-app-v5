import React, { useContext, useEffect, useState } from "react";
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

const ProfilePayConfirm = ({ receiver, onSuccess }: Props) => {
  const { isAuth, profile } = useContext(AppContext);
  const { address: connectedAddress } = useAccount();
  const [payAmount, setPayAmount] = useState(0);
  const [clickedButton, setClickedButton] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [addMessage, setAddMessage] = useState(false);
  const [message, setMessage] = useState("n/a");
  const [rainbowKit, setRainbowKit] = useState(false);

  /**
   * ACTION: Choose Amount
   **/
  const handleChooseAmount = (num: any) => {
    setPayAmount(num);
    setClickedButton(num);
    setIsClicked(true);
  };

  /**
   * ACTION: Add Message
   **/
  const onMessageChange = (e: any) => {
    setMessage(e.target.value);
  };
  const handleAddMessage = () => {
    if (addMessage == false) {
      setAddMessage(true);
    } else {
      setAddMessage(false);
    }
  };

  /**
   * ACTION: Show Billing
   **/
  //const [dollarAmount, setDollarAmount] = useState(0);
  const [dollarAmountWithFee, setDollarAmountWithFee] = useState(0);
  //const [ethAmount, setEthAmount] = useState(0);
  const [ethAmountWithFee, setEthAmountWithFee] = useState(0);
  const nativeCurrencyPrice = useNativeCurrencyPrice();

  useEffect(() => {
    if (nativeCurrencyPrice > 0) {
      //setDollarAmount(Number(payAmount));
      setDollarAmountWithFee(payAmount + (payAmount * 3) / 100);
      const ethAmount = convertUsdToEth(Number(payAmount), nativeCurrencyPrice);
      //setEthAmount(ethAmount);
      setEthAmountWithFee(ethAmount + (ethAmount * 3) / 100);
    }
  }, [nativeCurrencyPrice, payAmount]);

  /**
   * ACTION: Pay and trigger parents to refresh
   **/
  const handlePay = (hash: any) => {
    onSuccess(hash); //trigger profile pay modal
  };

  const { writeAsync: pay, isMining } = useScaffoldContractWrite({
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
      <div className="mt-6 font-semibold">Choose the amount:</div>
      <div className="mt-3 flex justify-between">
        <span
          className={`btn ${clickedButton === 50 ? "btn-primary" : ""} grow`}
          onClick={() => handleChooseAmount(50)}
        >
          <span>{"$50"}</span>
        </span>
        <span
          className={`btn ${clickedButton === 100 ? "btn-primary" : ""} grow ml-2 mr-2`}
          onClick={() => handleChooseAmount(100)}
        >
          <span>{"$100"}</span>
        </span>
        <span
          className={`btn ${clickedButton === 150 ? "btn-primary" : ""} grow`}
          onClick={() => handleChooseAmount(150)}
        >
          <span>{"$150"}</span>
        </span>
      </div>

      {isClicked && (
        <>
          {/* ADD MESSAGE */}
          <Link className="link-primary block mt-3" onClick={() => handleAddMessage()} href={""}>
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
          {/* BILL */}
          <div>
            <div className="flex justify-between border-b pt-8 pb-3 mb-3">
              <div>Amount</div>
              <div className="font-semibold">${payAmount}</div>
            </div>
            <div className="flex justify-between">
              <div className="pb-1">Total Bill</div>
              <div className="font-semibold">{`$${dollarAmountWithFee}`}</div>
            </div>
            <div className="flex justify-end">
              <div>{`${ethAmountWithFee} ETH`}</div>
            </div>
          </div>
          {/* CONFIRM BUTTON */}

          {/* PAY AS */}
          <div className="mt-10">
            {isAuth == "no" && (
              <>
                <div className="flex flex-col">
                  {!rainbowKit && (
                    <>
                      <div className="btn btn-secondary w-full mt-3" onClick={() => setRainbowKit(true)}>
                        Pay anonymously
                      </div>
                      <Link href="/login" className="btn btn-primary w-full mt-3">
                        Login
                      </Link>
                    </>
                  )}
                  {rainbowKit && (
                    <>
                      <RainbowKitCustomConnectButton btn="base" />
                      {connectedAddress && (
                        <div className="flex justify-center">
                          <button
                            className="btn btn-accent bg-gradient-to-r from-cyan-600 via-lime-500 border-0 text-black w-full mt-3"
                            onClick={() => pay()}
                          >
                            Confirm
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
            {isAuth == "yes" && !profile.wallet_id && (
              <>
                <div>You have no verified wallet, yet.</div>
                <div className="flex justify-center">
                  <Link href="/settings" className="btn btn-secondary w-full mt-3">
                    Verify a Wallet
                  </Link>
                </div>
              </>
            )}
            {isAuth == "yes" && profile.wallet_id && !connectedAddress && (
              <>
                <div className="flex btn btn-neutral h-full items-center justify-between pt-2 pb-2 mt-2">
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
                  <RainbowKitCustomConnectButton btn={"base"} />
                </div>
              </>
            )}
            {isAuth == "yes" && profile.wallet_id && connectedAddress && profile.wallet_id == connectedAddress && (
              <>
                <div className="flex btn btn-neutral h-full items-center justify-between pt-2 pb-2 mt-2">
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
            {isAuth == "yes" && profile.wallet_id && connectedAddress && profile.wallet_id !== connectedAddress && (
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
                {/* <div className="flex justify-center">
                  <Link href="/settings" className="btn btn-neutral w-full mt-3">
                    Reconnect
                  </Link>
                </div> */}
              </>
            )}
          </div>
          {isAuth == "yes" && profile.wallet_id && connectedAddress && profile.wallet_id == connectedAddress && (
            <div className="flex justify-center">
              <button
                className="btn btn-accent bg-gradient-to-r from-cyan-600 via-lime-500 border-0 text-black w-full mt-3"
                onClick={() => pay()}
              >
                Confirm
                {isMining && <span className="loading loading-ring loading-md"></span>}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProfilePayConfirm;
