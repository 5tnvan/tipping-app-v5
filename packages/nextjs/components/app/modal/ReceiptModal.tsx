import React, { useContext } from "react";

export const ReceiptModal = ({ isOpen, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex flex-col text-black z-30 absolute w-full p-5 rounded-lg left-0 top-4">
      {/* RECEIPT FRAME */}
      <div className="modal-content grow box-shadow-01">
        {/* RECEIPT CLOSE */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
          ✕
        </button>
        {/* FOLLOWERS INTO */}
        <div className="flex flex-col justify-center items-center mt-10">Done🎉 Save this receipt.</div>
        {/* FOLLOWERS CTA */}
        <div className="m-5">
          <div className="btn btn-light w-full" onClick={handleClose}>Share</div>
        </div>
      </div>
    </div>
  );
};
