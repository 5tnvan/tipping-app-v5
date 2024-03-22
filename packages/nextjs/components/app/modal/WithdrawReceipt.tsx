import React from "react";
import Link from "next/link";

type Props = {
  tx: any;
  isOpen: any;
  onClose: any;
};

export const WithdrawReceipt = ({ tx, isOpen, onClose }: Props) => {
  /**
   * ACTION: Handle Close
   **/
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="wildui-modal-container w-full h-full top-0 left-0 fixed flex justify-center items-start z-100">
      <div className="wildui-modal-child flex flex-col text-black z-30 mt-4">
        {/* WITHDRAW FRAME */}
        <div className="modal-content grow rounded-lg">
          {/* WITHDRAW CLOSE */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
            ✕
          </button>
          {/* WITHDRAW INTO */}
          <div className="p-6">
            <div className="font-semibold text-3xl">{"Done 🎉"}</div>
            <div className="mb-5">this is your receipt</div>
            {/* Close */}
            <Link
              href={"/blockexplorer/transaction/" + tx}
              className="btn btn-accent bg-gradient-to-r from-cyan-600 via-lime-500 border-0 text-black w-full mt-3"
            >
              Go to Transaction
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
