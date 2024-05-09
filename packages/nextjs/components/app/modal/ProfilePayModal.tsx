import React, { useContext } from "react";
import Link from "next/link";
import { Avatar } from "../authentication/Avatar";
import ProfilePayConfirm from "../pay/ProfilePayConfirm";
import { UserContext } from "~~/app/context";

type Props = {
  isOpen: any;
  onClose: any;
  onSuccess: any;
};

export const ProfilePayModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const { profile } = useContext(UserContext);

  /**
   * ACTION: Close modal
   **/
  const handleClose = () => {
    onClose();
  };

  /**
   * ACTION: Trigger parents on success
   **/
  const handlePaySuccess = (hash: any) => {
    console.log("profile/username/profilepaymodal, handlePaySuccess()");
    onSuccess(hash); //trigger profile/username
    onClose(); // closes profile pay
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="wildui-modal-container w-full h-full top-0 left-0 fixed flex justify-center items-start z-100">
      <div className="wildui-modal-child flex flex-col text-black z-30 mt-4">
        {/* PAY FRAME */}
        <div className="modal-content grow rounded-lg">
          {/* PAY CLOSE */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-30" onClick={handleClose}>
            ✕
          </button>
          {/* PAY CONTENT */}
          <div className="p-6">
            {/* PAY TO */}
            {profile.wallet_id && (
              <Link href={`/${profile.username}`} className="flex flex-col items-center justify-center mt-5">
                {profile.profile_bios.length > 0 && (
                  <Avatar profile={profile} width={12} ring={13} height={12} border={2} gradient={"g-tropical"} />
                )}
                {profile.profile_bios.length == 0 && (
                  <Avatar profile={profile} width={12} ring={13} height={12} border={0} gradient={"g-white"} />
                )}
                <div className="font-semibold mt-2">@{profile.username}</div>
              </Link>
            )}
            {!profile.wallet_id && (
              <>
                <div>User @{profile.username} has no verified wallet, yet.</div>
                <div className="btn btn-neutral w-full" onClick={handleClose}>
                  Go back
                </div>
              </>
            )}
            {/* PAY CONFIRM */}
            {profile.wallet_id && <ProfilePayConfirm receiver={profile.wallet_id} onSuccess={handlePaySuccess} />}
          </div>
        </div>
      </div>
    </div>
  );
};
