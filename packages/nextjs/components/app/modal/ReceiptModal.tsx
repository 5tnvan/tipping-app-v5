import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

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
    } else if (targetNetwork.id == 122 || targetNetwork.id == 123) {
      setNetwork("fuse");
    } else if (targetNetwork.id == 47763 || targetNetwork.id == 12227332) {
      setNetwork("neo");
    }
  }, [targetNetwork]);

  /**
   * ACTION: Wait 3 secs for Subgraph to finish indexing
   **/
  const [isPopulated, setIsPopulated] = useState<boolean>();

  useEffect(() => {
    setTimeout(async () => {
      setIsPopulated(true);
    }, 3000);
  }, [hash]);

  /**
   * ACTION: Handle close
   **/
  const handleClose = () => {
    setIsPopulated(false);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="wildui-modal-container w-full h-full top-0 left-0 fixed flex justify-center items-start z-100">
      <div className="wildui-modal-child flex flex-col text-black z-30 mt-4">
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
