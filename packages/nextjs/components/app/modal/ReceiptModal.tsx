import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useFetchPayment } from "~~/utils/app/fetch/fetchTransaction";

type Props = {
  hash: string;
  isOpen: any;
  onClose: any;
};

export const ReceiptModal = ({ hash, isOpen, onClose }: Props) => {

  /**
   * ACTION: Get network
   **/
  const [network, setNetwork] = useState("");
  const { targetNetwork } = useTargetNetwork();

  useEffect(() => {
    if (targetNetwork.id == 84532 || targetNetwork.id == 8453) {
      setNetwork("base");
    } else if (targetNetwork.id == 11155111 || targetNetwork.id == 1) {
      setNetwork("ethereum");
    }
  }, [targetNetwork]);

  /**
   * ACTION: Refetch till Subgraph finishes indexing
   **/
  const [isPopulated, setIsPopulated] = useState(false);
  const { paymentData, refetch } = useFetchPayment(hash, network);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!paymentData || paymentData?.paymentChanges?.length === 0) {
        refetch();
      } else {
        setIsPopulated(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [paymentData, refetch]);

  /**
   * ACTION: Handle close
   **/
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex flex-col text-black z-30 absolute w-full p-5 left-0 top-4">
      {/* RECEIPT FRAME */}
      <div className="modal-content grow box-shadow-01">
        {/* RECEIPT CLOSE */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
          ✕
        </button>
        {/* RECEIPT INFO */}
        <div className="p-5 rounded-lg">
          <div className="font-semibold custom-text-blue text-3xl pt-10">{"Success 🎉."}</div>
          <div className=" custom-text-blue text-xl mb-5">{"Save this receipt."}</div>
          {/* RECEIPT */}
          {!isPopulated && <span className="loading loading-ring loading-md"></span>}
          {isPopulated && (
            <>
              <Link
                href={"/transaction/payment/" + network + "/" + hash}
                className="btn btn-primary w-full mt-3 mb-2"
                onClick={onClose}
              >
                Go to transaction
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
