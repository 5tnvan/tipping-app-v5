import React from "react";
import WalletConnectVerify from "../wallet/WalletConnectVerify";

type Props = {
  isOpen: any;
  onClose: any;
};

export const WalletModal = ({ isOpen, onClose }: Props) => {
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex flex-col text-black z-30 absolute w-full p-5 rounded-lg left-0 top-4">
      {/* FOLLOWERS FRAME */}
      <div className="modal-content grow box-shadow-01">
        {/* FOLLOWERS CLOSE */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
          ✕
        </button>
        <div className="p-10">
          <WalletConnectVerify />
          {/* <button className="btn btn-neutral w-full mt-8" onClick={handleClose}>
            Close
          </button> */}
        </div>
      </div>
    </div>
  );
};
