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
    <div className="wildui-modal-container w-full h-full top-0 left-0 fixed flex justify-center items-start z-100">
      <div className="wildui-modal-child flex flex-col text-black z-30 mt-4">
        {/* FOLLOWERS FRAME */}
        <div className="modal-content rounded-lg">
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
    </div>
  );
};
