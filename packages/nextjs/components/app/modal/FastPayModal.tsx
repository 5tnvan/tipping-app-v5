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
        <div className="pt-12 pb-10">
          <div className="flex flex-col">
            {followersData?.following?.length == 0 && (
              <div className="flex h-full justify-center items-center pl-5 pr-5">
                <Link href="/leaderboard" className="btn btn-neutral" onClick={handleClose}>
                  Start following someone 🥳
                </Link>
              </div>
            )}
            {!receiver && Array.isArray(followersData.following) && followersData?.following?.length > 0 && (
              <>
                <div className="font-semibold pl-5 pr-5">Pay to:</div>
                <div className="wildui-fastpay-scroll-a overflow-scroll pl-5 pr-5 pb-5">
                  {followersData.following.map((following: any) => (
                    <div
                      key={following.following.id}
                      className="flex h-max btn btn-accent bg-gradient-to-r from-cyan-600 via-lime-500 items-center justify-between pt-2 pb-2 mt-2"
                      onClick={() => handlePicked(following.following)}
                    >
                      <div className="flex items-center">
                        {following.following.profile_bios.length > 0 && (
                          <Avatar
                            profile={following.following}
                            width={8}
                            height={8}
                            ring={9}
                            border={2}
                            gradient={"g-tropical"}
                          />
                        )}
                        {following.following.profile_bios.length == 0 && (
                          <Avatar
                            profile={following.following}
                            width={8}
                            height={8}
                            ring={9}
                            border={0}
                            gradient={"g-white"}
                          />
                        )}

                        <div className="ml-2 font-semibold pl-3">{following.following.username}</div>
                      </div>
                      <div>
                        <ArrowRightIcon />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {/* FAST PAY CHOSEN RECEIVER */}
            <div className="pl-5 pr-5">
              {receiver && (
                <>
                  <button className="font-semibold flex items-center" onClick={() => setReceiver(null)}>
                    <ArrowLeftIcon />
                    Back
                  </button>
                  <Link
                    href={`/${receiver.username}`}
                    className="flex flex-col items-center justify-center mt-3"
                    onClick={handleClose}
                  >
                    {receiver.profile_bios.length > 0 && (
                      <Avatar profile={receiver} width={12} height={12} border={2} ring={14} gradient={"g-tropical"} />
                    )}
                    {receiver.profile_bios.length == 0 && (
                      <Avatar profile={receiver} width={12} height={12} border={2} ring={14} gradient={"w-tropical"} />
                    )}
                    <div className="font-semibold mt-2">@{receiver.username}</div>
                  </Link>
                </>
              )}
            </div>
          </div>
          {/* FAST PAY CONFIRM */}
          <div className="pl-5 pr-5">
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
