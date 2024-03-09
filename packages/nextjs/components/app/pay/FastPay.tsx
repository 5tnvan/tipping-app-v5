import React, { useState } from "react";
import { parseEther } from "viem";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth/useNativeCurrencyPrice";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";
import { convertUsdToEth } from "~~/utils/app/functions/convertUsdToEth";

const FastPay = (receiver) => {
  const [inputValue, setInputValue] = useState("0.00");
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
    const formattedValue = isNaN(value) ? "0.00" : value.toFixed(2);
    const ethAmount = convertUsdToEth(parseFloat(formattedValue), nativeCurrencyPrice);
    setInputValue(formattedValue);
    setEthAmount(ethAmount);
  };
  const handlePay = () => {
    console.log(receiver.receiver, message, ethAmount);
    pay();
    setSuccess("success");
  };

  //HOOK: useScaffoldContractWrite | set: greeting
  const { writeAsync: pay } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setTip",
    args: [receiver.receiver, message],
    value: parseEther(ethAmount.toString()),
  });

  return (
    <>
      <div id="wildpay-fastpay" className="flex items-center pt-10 text-5xl">
        <span className="text-3xl">$</span>
        <div>
          <input
            type="number"
            step="0.01" // Set the step to control decimals
            placeholder="0.00"
            className="text-center custom-text-blue"
            onChange={handleInput}
          />
        </div>

        <span className="text-3xl">USD</span>
      </div>
      <div>2 decimals: {inputValue} </div>
      <div>Eth: {ethAmount} Ξ</div>
      <div>
        <span className="link-primary block mt-2" onClick={() => addMessageClick()}>
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
      </div>
      <div>{success}</div>
      <div className="flex justify-center">
        <button className="btn btn-neutral w-full mt-3" onClick={handlePay}>
          Confirm
        </button>
      </div>
    </>
  );
};

export default FastPay;
