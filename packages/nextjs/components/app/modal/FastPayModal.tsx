import React, { useContext, useState } from "react";
import Link from "next/link";
import { Avatar } from "../authentication/Avatar";
import FastPayConfirm from "../pay/FastPayConfirm";
import { FollowersContext } from "~~/app/context";
import { ArrowLeftIcon } from "~~/components/assets/ArrowLeftIcon";
import { ArrowRightIcon } from "~~/components/assets/ArrowRightIcon";

type Props = {
  isOpen: any;
  onClose: any;
  onSuccess: any;
};

export const FastPayModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const { followersData } = useContext(FollowersContext);
  const [receiver, setReceiver] = useState<any>();

  /**
   * ACTION: Close modal
   **/
  const handleClose = () => {
    onClose();
    setReceiver(null);
  };

  /**
   * ACTION: Pick receiver
   **/
  const handlePicked = (following: any) => {
    setReceiver(following);
  };

  /**
   * ACTION: Trigger parents on success
   **/
  const handlePaySuccess = (hash: any) => {
    handleClose();
    console.log("FastPayModal: clear receiver");
    onSuccess(hash);
    console.log("FastPayModal: triggerIsAuthLayout(hash) finished");
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex flex-col text-black z-30 absolute w-full h-full left-0">
      {/* FAST PAY FRAME */}
      <div className="modal-content grow">
        {/* FAST PAY CLOSE */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
          ✕
        </button>
        {/* FAST PAY TO */}
        <div className="pt-12 pl-5 pr-5 pb-10">
          <div className="flex flex-col">
            {followersData?.following?.length == 0 && (
              <div className="flex h-full justify-center items-center">
                <Link href="/leaderboard" className="btn btn-neutral" onClick={handleClose}>
                  Start following someone 🥳
                </Link>
              </div>
            )}
            {!receiver && Array.isArray(followersData.following) && followersData?.following?.length > 0 && (
              <>
                <div className="font-semibold">Pay to:</div>
                {followersData.following.map((following: any) => (
                  <div
                    key={following.wallet_id}
                    className="flex btn btn-accent bg-gradient-to-r from-cyan-600 via-lime-500 h-full items-center justify-between pt-2 pb-2 mt-2"
                    onClick={() => handlePicked(following)}
                  >
                    <div className="flex items-center">
                      <Avatar profile={following} width={8} ring={false} />
                      <div className="ml-2 font-semibold pl-3">{following.username}</div>
                    </div>
                    <div>
                      <ArrowRightIcon />
                    </div>
                  </div>
                ))}
              </>
            )}
            {/* FAST PAY CHOSEN RECEIVER */}
            <div className="">
              {receiver && (
                <>
                  <button className="font-semibold flex items-center" onClick={() => setReceiver(null)}>
                    <ArrowLeftIcon />
                    Back
                  </button>
                  <div className="flex flex-col items-center justify-center mt-3">
                    <Avatar profile={receiver} width={12} ring={false} />
                    <div className="font-semibold mt-2">@{receiver.username}</div>
                    {/* <div className="mt-2">{receiver.wallet_id}</div> */}
                  </div>
                </>
              )}
            </div>
          </div>
          {/* FAST PAY CONFIRM */}
          <div>
            {receiver && receiver.wallet_id && (
              <FastPayConfirm receiver={receiver.wallet_id} onSuccess={handlePaySuccess} onClose={handleClose} />
            )}
            {receiver && !receiver.wallet_id && (
              <>
                <div className="flex justify-center">
                  <span className="font-semibold mr-1">@{receiver.username}</span>
                  {" has no verified wallet, yet."}
                </div>
                <div className="flex justify-center">
                  <button className="btn btn-secondary w-full mt-3" onClick={() => setReceiver(null)}>
                    Go Back
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
