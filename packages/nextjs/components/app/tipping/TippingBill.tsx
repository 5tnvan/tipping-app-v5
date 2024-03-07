import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { parseEther } from "viem";
import { AppContext } from "~~/app/context";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";
import { useGlobalState } from "~~/services/store/store";

const TippingBill = ({ receiver, tipAmount, message, refetch }) => {
  //App Context
  const { username } = useParams();

  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);
  const [totalAmountUSD, setTotalAmountUSD] = useState(0);
  const [totalAmountETH, setTotalAmountETH] = useState(0);

  const getTotalAmount = useCallback(() => {
    setTotalAmountUSD(tipAmount * 1.015);
  }, [tipAmount]);

  const convertUsdToEth = useCallback(() => {
    if (nativeCurrencyPrice) {
      // Convert USD to ETH using the nativeCurrencyPrice
      const calculatedEthAmount = totalAmountUSD / nativeCurrencyPrice;

      // Round to 8 decimal places (adjust as needed)
      const roundedEthAmount = parseFloat(calculatedEthAmount.toFixed(8));

      setTotalAmountETH(roundedEthAmount);
    }
  }, [nativeCurrencyPrice, totalAmountUSD]);

  useEffect(() => {
    getTotalAmount();
    convertUsdToEth();
  }, [convertUsdToEth, getTotalAmount]);

  const handleSetTip = () => {
    setTip();
    refetch();
    console.log("/" + username);
  };

  //HOOK: useScaffoldContractWrite | set: greeting
  const { writeAsync: setTip } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setTip",
    args: [receiver, message],
    value: parseEther(totalAmountETH.toString()),
  });

  return (
    <>
      <div>
        <div className="flex justify-between border-b pt-8 pb-3 mb-3">
          <div>{`Amount`}</div>
          <div className="font-semibold">{`$${tipAmount.toFixed(2)}`}</div>
        </div>
        <div className="flex justify-between">
          <div className="pb-1">{`Total Bill`}</div>
          <div className="font-semibold">{`$${totalAmountUSD.toFixed(2)}`}</div>
        </div>
        <div className="flex justify-end">
          <div>{`${totalAmountETH} ETH`}</div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="btn btn-neutral mt-3" onClick={handleSetTip}>
          Confirm
        </button>
      </div>
    </>
  );
};

export default TippingBill;
