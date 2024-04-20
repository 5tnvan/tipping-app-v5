import React from "react";

type Props = {
  isOpen: any;
  onClose: any;
};

export const UnlockModal = ({ isOpen, onClose }: Props) => {
  const handleClose = () => {
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
          <div className="pl-6 pr-6 py-10">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">What is your invitation code?</span>
                <span className="label-text-alt">8 character code</span>
              </div>
              <input type="text" placeholder="Type here" className="input input-bordered w-full" />
            </label>
            <div className="btn btn-primary w-full mt-5">Unlock</div>
          </div>
        </div>
      </div>
    </div>
  );
};
