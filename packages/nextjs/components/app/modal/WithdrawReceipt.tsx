import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useFetchPayment, useFetchWithdraw } from "~~/utils/app/fetch/fetchTransaction";

type Props = {
  tx: any;
  isOpen: any;
  onClose: any;
};

export const WithdrawReceipt = ({ tx, isOpen, onClose }: Props) => {
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
  const { withdrawData, refetch } = useFetchWithdraw(tx, network);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!withdrawData || withdrawData?.withdrawChanges?.length === 0) {
        refetch();
      } else {
        setIsPopulated(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [withdrawData, refetch]);

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
            <div className="text-primary font-semibold text-3xl">{"Success 🎉"}</div>
            <div className="mb-5">Save your receipt</div>
            {/* Close */}
            {!isPopulated && <span className="loading loading-ring loading-md"></span>}
            {isPopulated && (
              <>
                <Link
                  href={`/transaction/withdraw/${network}/${tx}`}
                  className="btn btn-accent bg-gradient-to-r from-cyan-600 via-lime-500 border-0 text-black w-full mt-3"
                  onClick={handleClose}
                >
                  Go to transaction
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
