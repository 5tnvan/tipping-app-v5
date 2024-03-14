import React, { useContext } from "react";
import Link from "next/link";
import TransactionLatest from "../accounting/TransactionsLatest";
import { AccountingContext } from "~~/app/context";

export const ReceiptModal = ({ isOpen, onClose }) => {
  const { outgoingTx } = useContext(AccountingContext);

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex flex-col text-black z-30 absolute w-full p-5 rounded-lg left-0 top-4">
      {/* RECEIPT FRAME */}
      <div className="modal-content grow box-shadow-01">
        {/* RECEIPT CLOSE */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
          ✕
        </button>
        {/* RECEIPT INTO */}
        <div className="p-5">
          <div className="font-semibold custom-text-blue text-3xl pt-10">{"Done 🎉."}</div>
          <div className=" custom-text-blue text-xl mb-5">{"Save this receipt."}</div>
          {/* RECEIPT */}
          <TransactionLatest tx={outgoingTx} />
        </div>
      </div>
    </div>
  );
};
