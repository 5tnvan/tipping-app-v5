import React, { useContext } from "react";
import { Avatar } from "../authentication/Avatar";
import ProfilePayConfirm from "../pay/ProfilePayConfirm";
import { AppContext, PublicContext } from "~~/app/context";

type Props = {
  isOpen: any;
  onClose: any;
  onSuccess: any;
};

export const ProfilePayModal = ({ isOpen, onClose, onSuccess }: Props) => {
  const { profile } = useContext(AppContext);
  const { publicProfile } = useContext(PublicContext);

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
    <div className="flex flex-col text-black z-30 absolute w-full p-5 rounded-lg left-0 top-4">
      {/* PAY FRAME */}
      <div className="modal-content grow box-shadow-01">
        {/* PAY CLOSE */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-30" onClick={handleClose}>
          ✕
        </button>
        {/* PAY CONTENT */}
        <div className="modal-content p-6">
          {/* PAY TO */}
          {publicProfile.wallet_id && (
            <div className="flex flex-col items-center justify-center mt-5">
              <Avatar profile={publicProfile} width={12} ring={false} />
              <div className="font-semibold mt-2">@{publicProfile.username}</div>
              {/* <div className="mt-2">{receiver.wallet_id}</div> */}
            </div>
          )}
          {!publicProfile.wallet_id && (
            <>
              <div>User @{publicProfile.username} has no verified wallet, yet.</div>
              <div className="btn btn-neutral w-full" onClick={handleClose}>
                Go back
              </div>
            </>
          )}
          {/* PAY CONFIRM */}
          {publicProfile.wallet_id && profile.wallet_id && (
            <ProfilePayConfirm receiver={publicProfile.wallet_id} onSuccess={handlePaySuccess} />
          )}
        </div>
      </div>
    </div>
  );
};
