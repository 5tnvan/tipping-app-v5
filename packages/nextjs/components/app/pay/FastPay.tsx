import React, { useState } from "react";
import { parseEther } from "viem";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth/useNativeCurrencyPrice";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";
import { convertUsdToEth } from "~~/utils/app/functions/convertUsdToEth";

const FastPay = ({ receiver, onSuccess }) => {
  const [ethAmount, setEthAmount] = useState(0);
  const [ethAmountWithFee, setEthAmountWithFee] = useState(0);
  const [dollarAmount, setDollarAmount] = useState(0);
  const [dollarAmountWithFee, setDollarAmountWithFee] = useState(0);
  const [addMessage, setAddMessage] = useState(false);
  const [message, setMessage] = useState("n/a");
  const [success, setSuccess] = useState("");
  const nativeCurrencyPrice = useNativeCurrencyPrice();

  const addMessageClick = () => {
    if (addMessage == false) {
      setAddMessage(true);
    } else {
      setAddMessage(false);
    }
  };

  const onMessageChange = e => {
    setMessage(e.target.value);
  };

  const handleInput = e => {
    const dollarAmount = Number(e.target.value);
    const ethAmount = convertUsdToEth(dollarAmount, nativeCurrencyPrice);
    setDollarAmount(dollarAmount);
    setDollarAmountWithFee(dollarAmount + (dollarAmount * 3) / 100);
    setEthAmount(ethAmount);
    setEthAmountWithFee(ethAmount + (ethAmount * 3) / 100);
  };
  const handlePay = () => {
    pay();
    console.log("paid:", receiver, message, ethAmount, ethAmountWithFee);
    setSuccess("success");
    onSuccess();
  };

  //HOOK: useScaffoldContractWrite | set: setPayment
  const { writeAsync: pay } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setPayment",
    args: [receiver, message],
    value: parseEther(ethAmountWithFee.toString()),
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
        <div>
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

      {/* MESSAGE */}
      <div className="flex flex-col items-center mt-10">
        <span className="link-primary block mt-2" onClick={() => addMessageClick()}>
          Leave a message
        </span>
        {addMessage && (
          <input
            type="text"
            placeholder="Type your message"
            className="input block input-bordered input-primary w-full mt-2"
            onChange={e => onMessageChange(e)}
          />
        )}
      </div>
      <div>{success}</div>
      {/* BUTTON */}
      <div className="flex justify-center">
        <button className="btn btn-neutral w-full mt-3" onClick={handlePay}>
          Confirm
        </button>
      </div>
    </>
  );
};

export default FastPay;
