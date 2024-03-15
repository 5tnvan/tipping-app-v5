import React, { useCallback, useContext, useEffect, useState } from "react";
import { parseEther } from "viem";
import { PublicContext } from "~~/app/context";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth/useNativeCurrencyPrice";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";
import { convertUsdToEth } from "~~/utils/app/functions/convertUsdToEth";

const ProfilePayBill = ({ receiver, amount, message, onSuccess }) => {
  const [ethAmount, setEthAmount] = useState(0);
  const [ethAmountWithFee, setEthAmountWithFee] = useState(0);
  const [dollarAmount, setDollarAmount] = useState(0);
  const [dollarAmountWithFee, setDollarAmountWithFee] = useState(0);
  const nativeCurrencyPrice = useNativeCurrencyPrice();

  useEffect(() => {
    setDollarAmount(Number(amount));
    const ethAmount = convertUsdToEth(dollarAmount, nativeCurrencyPrice);
    setDollarAmountWithFee(dollarAmount + (dollarAmount * 3) / 100);
    setEthAmount(ethAmount);
    setEthAmountWithFee(ethAmount + (ethAmount * 3) / 100);
  }, [amount, dollarAmount, nativeCurrencyPrice]);

  const handlePay = () => {
    pay();
    onSuccess();
  };

  return (
    <>
      {/* BILL */}
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
      {/* CONFIRM BUTTON */}
      <div className="flex justify-center">
        <button className="btn btn-neutral mt-3" onClick={handlePay}>
          Confirm
        </button>
      </div>
    </>
  );
};

export default ProfilePayBill;
