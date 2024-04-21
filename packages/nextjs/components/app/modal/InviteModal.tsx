import React, { useState } from "react";
import { CheckCircleIcon, EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import { CopyIcon } from "~~/components/assets/CopyIcon";

type Props = {
  isOpen: any;
  onClose: any;
  data: any;
};

export const InviteModal = ({ isOpen, onClose, data }: Props) => {
  /* COPY BUTTON */
  const [copied, setCopied1] = useState(false);
  const handleCopyToClipboard = (code:any) => {
    navigator.clipboard.writeText(code);
    setCopied1(true);
    setTimeout(() => {
      setCopied1(false);
    }, 1500);
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  console.log(data);

  return (
    <div className="wildui-modal-container w-full h-full top-0 left-0 fixed flex justify-center items-start z-100">
      <div className="wildui-modal-child flex flex-col text-black z-30 mt-4">
        {/* FOLLOWERS FRAME */}
        <div className="modal-content rounded-lg">
          {/* FOLLOWERS CLOSE */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
            ✕
          </button>
          <div className="pl-6 pr-6 pt-10 pb-5">
            <div className="font-semibold custom-text-blue text-3xl">{"Success 🎉."}</div>
            <div className=" custom-text-blue text-xl mb-5">{"Share this invite code"}</div>
            <div
              className="btn btn-accent flex justify-between items-center p-4 mb-2 url h-full min-h-8 bg-gradient-to-r from-cyan-600 via-lime-500 border-0 w-full"
              onClick={() => handleCopyToClipboard(data.id)}
            >
              {copied ? (
                <>
                  <span>
                    <EnvelopeOpenIcon width={14} />
                  </span>
                  <span className="mr-1">Copied</span>
                  <span className="text-secondary">
                    <CheckCircleIcon width={14} />
                  </span>
                </>
              ) : (
                <>
                  <span>
                    <EnvelopeOpenIcon width={14} />
                  </span>
                  <span className="mr-1">{data.id}</span>
                  <span>
                    <CopyIcon />
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
