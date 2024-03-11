import React, { useContext, useState } from "react";
import { Avatar } from "../authentication/Avatar";
import FastPay from "../pay/FastPay";
import { AppContext } from "~~/app/context";
import { ArrowLeftIcon } from "~~/components/assets/ArrowLeftIcon";
import { ArrowRightIcon } from "~~/components/assets/ArrowRightIcon";
import { CheckMarkIcon } from "~~/components/assets/CheckMarkIcon";
import { useFollowers } from "~~/hooks/app/useFollowers";

export const PayModal = ({ isOpen, onClose }) => {
  const { isLoadingAuth, isAuth, profile, refetchAuth } = useContext(AppContext);
  const { isLoading: isLoadingFollowers, followersData, refetch: refetchFollowers } = useFollowers(profile.id);
  const [receiver, setReceiver] = useState();
  const [picked, setPicked] = useState("");

  const handleClose = () => {
    onClose();
    setReceiver(null);
  };
  const handlePicked = following => {
    setReceiver(following);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex flex-col text-black z-30 absolute w-full h-full left-0">
      {/* PAY FRAME */}
      <div className="modal-content grow">
        {/* PAY CLOSE */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
          ✕
        </button>

        {/* PAY TO */}
        <div className="pt-12 pl-5 pr-5 pb-10">
          <div className="flex flex-col">
            {!receiver && Array.isArray(followersData.following) && (
              <>
                <div className="font-semibold">Choose receiver:</div>
                {followersData.following.map(following => (
                  <>
                    <div
                      key={following.wallet_id}
                      className="flex btn btn-secondary h-full items-center justify-between pt-2 pb-2 mt-2"
                      onClick={() => handlePicked(following)}
                    >
                      <div className="flex items-center">
                        <Avatar profile={following} width={8} />
                        <div className="ml-2 font-semibold pl-3">{following.username}</div>
                      </div>
                      <div>
                        <ArrowRightIcon />
                      </div>
                    </div>
                  </>
                ))}
              </>
            )}

            <div className="mt-3">
              {receiver && (
                <>
                  <div className="font-semibold flex items-center" onClick={() => setReceiver(null)}>
                    <ArrowLeftIcon />
                    Back
                  </div>
                  <div className="flex flex-col items-center justify-center mt-5">
                    <Avatar profile={receiver} width={12} />
                    <div className="font-semibold mt-2">@{receiver.username}</div>
                    <div className="font-semibold mt-2">@{receiver.wallet_id}</div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* FAST PAY */}
          <div>{receiver && <FastPay receiver={receiver.wallet_id} />}</div>
        </div>
        {/* PAY FOLLOWING */}
      </div>
    </div>
  );
};
