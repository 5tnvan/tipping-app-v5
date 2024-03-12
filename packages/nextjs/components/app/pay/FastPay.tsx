import React, { useState } from "react";
import { parseEther } from "viem";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth/useNativeCurrencyPrice";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";
import { convertUsdToEth } from "~~/utils/app/functions/convertUsdToEth";

const FastPay = ({ receiver, onSuccess }) => {
  const [inputValue, setInputValue] = useState(0);
  const [ethAmount, setEthAmount] = useState(0);
  const [addMessage, setAddMessage] = useState(false);
  const [message, setMessage] = useState("");
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
    const value = parseFloat(e.target.value);
    const ethAmount = convertUsdToEth(value, nativeCurrencyPrice);
    setInputValue(value);
    setEthAmount(ethAmount);
  };
  const handlePay = () => {
    console.log("client:", receiver, message, ethAmount);
    pay();
    setSuccess("success");
    onSuccess();
  };

  //HOOK: useScaffoldContractWrite | set: greeting
  const { writeAsync: pay } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setTip",
    args: [receiver, message],
    value: parseEther(ethAmount.toString()),
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
      {/* USD */}
      <div className="flex justify-end">Eth: {ethAmount} Ξ</div>
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
