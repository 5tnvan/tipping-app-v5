import React, { useContext } from "react";
import ProfilePayConfirm from "../pay/ProfilePayConfirm";
import { PublicContext } from "~~/app/context";

export const ProfilePayModal = ({ isOpen, onClose, onSuccess }) => {
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
        <div className="modal-content">
          <div className="p-5">
            <div>@{publicProfile.username}</div>
            <div>{publicProfile.wallet_id}</div>
            {/* PAY CONFIRM */}
            <ProfilePayConfirm receiver={publicProfile.wallet_id} onSuccess={handlePaySuccess} />
          </div>
        </div>
      </div>
    </div>
  );
};
