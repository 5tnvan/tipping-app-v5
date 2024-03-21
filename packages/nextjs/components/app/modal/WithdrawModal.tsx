import React from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth/useScaffoldContractWrite";

type Props = {
  isOpen: any;
  amount: any;
  onClose: any;
};

export const WithdrawModal = ({ isOpen, amount, onClose }: Props) => {
  const handleClose = () => {
    onClose();
  };

  const handleWithdraw = () => {
    withdraw();
    //alert("handleWithdraw");
  };

  //HOOK: useScaffoldContractWrite
  const { writeAsync: withdraw } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "withdraw",
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex flex-col text-black z-30 absolute w-full p-5 rounded-lg left-0 top-4">
      {/* WITHDRAW FRAME */}
      <div className="modal-content grow box-shadow-01">
        {/* WITHDRAW CLOSE */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
          ✕
        </button>
        {/* FOLLOWERS INTO */}
        <div className="flex flex-col justify-center items-center mt-10 text-3xl">{amount} ETH</div>
        {/* WITHDRAW CTA */}
        <div className="m-5">
          <div className="btn btn-neutral w-full" onClick={handleWithdraw}>
            Confirm
          </div>
        </div>
      </div>
    </div>
  );
};
