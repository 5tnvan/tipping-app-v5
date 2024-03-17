import React, { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth/useNativeCurrencyPrice";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";
import { convertUsdToEth } from "~~/utils/app/functions/convertUsdToEth";

type Props = {
  receiver: any;
  onSuccess: any;
};

const ProfilePayConfirm = ({ receiver, onSuccess }: Props) => {
  const [payAmount, setPayAmount] = useState(0);
  const [clickedButton, setClickedButton] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [addMessage, setAddMessage] = useState(false);
  const [message, setMessage] = useState("n/a");

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
      <div className="mt-6 font-semibold">Choose the amount:</div>
      <div className="mt-3">
        <span
          className={`btn w-full ${clickedButton === 50 ? "btn-primary" : "btn-secondary"} mb-3`}
          onClick={() => handleChooseAmount(50)}
        >
          <span>{"$50"}</span>
        </span>
        <span
          className={`btn w-full ${clickedButton === 100 ? "btn-primary" : "btn-secondary"} mb-3`}
          onClick={() => handleChooseAmount(100)}
        >
          <span>{"$100"}</span>
        </span>
        <span
          className={`btn w-full ${clickedButton === 150 ? "btn-primary" : "btn-secondary"} mb-3`}
          onClick={() => handleChooseAmount(150)}
        >
          <span>{"$150"}</span>
        </span>
      </div>

      {isClicked && (
        <>
          {/* ADD MESSAGE */}
          <span className="link-primary block mt-2" onClick={() => handleAddMessage()}>
            Leave a message
          </span>
          {addMessage && (
            <input
              type="text"
              placeholder="Type your message"
              className="input block input-bordered input-primary w-full"
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
          <div className="flex justify-center">
            <button className="btn btn-neutral mt-3" onClick={() => pay()}>
              Confirm
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ProfilePayConfirm;
