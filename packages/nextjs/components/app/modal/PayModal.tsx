import React, { useContext, useState } from "react";
import { Avatar } from "../authentication/Avatar";
import FastPay from "../pay/FastPay";
import { AppContext, FollowersContext, PublicContext } from "~~/app/context";
import { useFollowers } from "~~/hooks/app/useFollowers";
import { fetchPublicProfile, fetchPublicProfileFromId } from "~~/utils/app/fetchUser";

export const PayModal = ({ isOpen, onClose }) => {
  const { isLoadingAuth, isAuth, profile, refetchAuth } = useContext(AppContext);
  const { isLoading: isLoadingFollowers, followersData, refetch: refetchFollowers } = useFollowers(profile.id);
  const [receiver, setReceiver] = useState("");
  const [picked, setPicked] = useState("");

  const handleClose = () => {
    onClose();
  };
  const handlePicked = wallet_id => {
    setReceiver(wallet_id);
    setPicked("sending to: " + wallet_id);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex flex-col text-black z-30 absolute w-full h-full left-0">
      {/* PAY FRAME */}
      <div className="modal-content grow">
        {/* PAY CLOSE */}
        <span className="close-button" onClick={handleClose}>
          &times;
        </span>
        {/* PAY FOLLOWING */}
        <div>Following:</div>
        <div className="flex flex-col">
          {followersData.following.map((following, index) => (
            <>
              <div key={index} className="flex" onClick={() => handlePicked(following.wallet_id)}>
                <Avatar profile={following} width={10} />
                <div className="ml-2">@{following.username}</div>
              </div>
            </>
          ))}
          <div>{picked}</div>
        </div>
        {/* FAST PAY */}
        <div>
          <FastPay receiver={receiver} />
        </div>
      </div>
    </div>
  );
};
