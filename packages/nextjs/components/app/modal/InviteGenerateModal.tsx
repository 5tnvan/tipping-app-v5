import React, { useEffect, useState } from "react";
import { CheckCircleIcon, EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import { generateInvite } from "~~/app/settings/invites/actions";
import { CopyIcon } from "~~/components/assets/CopyIcon";

type Props = {
  isOpen: any;
  onClose: any;
  data: any;
  refetch: any;
};

export const InviteGenerateModal = ({ isOpen, onClose, data, refetch }: Props) => {
  const [inviteLeft, setInviteLeft] = useState<any>();
  const [invite, setInvite] = useState<any>();
  const [error, setError] = useState<any>();
  const [isProcessing, setIsProcessing] = useState(false);

  //calculate invites left
  useEffect(() => {
    let countNullClaimedBy = 0;
    data?.forEach((item: any) => {
      if (item.claimed_by === null) {
        countNullClaimedBy++;
      }
    });
    if (countNullClaimedBy > 3) setInviteLeft(0);
    if (countNullClaimedBy <= 3) setInviteLeft(3 - countNullClaimedBy);
  }, [data]);

  //handle generate
  const handleGenerate = async () => {
    try {
      setIsProcessing(true);
      const invite = await generateInvite();
      setIsProcessing(false);
      setInvite(invite);
      refetch();
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  console.log("invite", invite);

  /* COPY BUTTON */
  const [copied, setCopied] = useState(false);
  const handleCopyToClipboard = (code: any) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const handleClose = () => {
    setInvite(null);
    setIsProcessing(false);
    setError(null);
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
          {!invite && (
            <div className="pl-6 pr-6 pt-10 pb-7">
              <div>
                You can generate: <span className="text-primary font-semibold">{inviteLeft}</span> invites
              </div>
              <div
                className={`btn btn-primary w-full mt-5 mb-2 ${inviteLeft == 0 ? "btn-disabled" : ""}`}
                onClick={handleGenerate}
              >
                Generate
                {isProcessing && <span className="loading loading-ring loading-md"></span>}
              </div>
              {error && error}
            </div>
          )}
          {invite && (
            <div className="pl-6 pr-6 pt-10 pb-5">
              <div className="font-semibold custom-text-blue text-3xl">{"Success 🎉."}</div>
              <div className=" custom-text-blue text-xl mb-5">{"Share this invite code"}</div>
              <div
                className="btn btn-accent flex justify-between items-center p-4 mb-2 url h-full min-h-8 bg-gradient-to-r from-cyan-600 via-lime-500 border-0 w-full"
                onClick={() => handleCopyToClipboard(invite[0].id)}
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
                    <span className="mr-1">{invite[0].id}</span>
                    <span>
                      <CopyIcon />
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
