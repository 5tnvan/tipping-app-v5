import React, { useContext, useState } from "react";
import { Avatar } from "../authentication/Avatar";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { AppContext } from "~~/app/context";
import { unlockLevel } from "~~/app/levels/actions";
import { ArrowLeftIcon } from "~~/components/assets/ArrowLeftIcon";
import { fetchInviteByID } from "~~/utils/app/fetch/fetchInvites";

type Props = {
  isOpen: any;
  onClose: any;
  levelToUnlock: any;
};

export const UnlockModal = ({ isOpen, onClose, levelToUnlock }: Props) => {
  const { profile } = useContext(AppContext);
  const [inputBox, setInputBox] = useState(true);
  const [input, setInput] = useState<any>();
  const [checkButton, setCheckButton] = useState(true);
  const [unlockButton, setUnlockButton] = useState(false);
  const [invite, setInvite] = useState<any>();
  const [isProcessing, setProcessing] = useState<any>();
  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState<any>();

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleCheck = async () => {
    try {
      setProcessing(true);
      setError(null);
      const res = await fetchInviteByID(input); //fetch invite to check
      setInvite(res);
      if (!res.code[0].claimed_by && levelToUnlock == res.code[0].type && profile.id != res.code[0].user_id) {
        //open unlock
        setInputBox(false);
        setCheckButton(false);
        setUnlockButton(true);
      }
    } catch (error) {
      setError("Code not found. Please try again.");
    }
    setProcessing(false);
  };

  const handleUnlock = async () => {
    try {
      const res = await unlockLevel(invite.code[0].id);
      setSuccess(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = async () => {
    setInput(null);
    setInputBox(true);
    setCheckButton(true);
    setUnlockButton(false);
    setInvite(null);
  };

  const handleClose = () => {
    setInput(null);
    setError(null);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  console.log("levelToUnlock", levelToUnlock);
  console.log("invite", invite);

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
            {inputBox && (
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">What is your invitation code?</span>
                  <span className="label-text-alt">36 character code</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  onChange={handleInputChange}
                />
              </label>
            )}
            {error && (
              <div role="alert" className="flex justify-between text-sm items-center alert alert-error mt-3">
                <div className="flex items-center">
                  <div className="mr-1">
                    <XCircleIcon width={18} />
                  </div>
                  <span>{error}</span>
                </div>
                <div className="cursor-pointer">
                  <XMarkIcon width={18} onClick={() => setError(null)} />
                </div>
              </div>
            )}
            {invite && invite.code[0].claimed_by && (
              <div className="flex btn btn-neutral h-full items-center justify-between pt-2 pb-2 mt-4 mb-2">
                <div className="flex items-center">
                  <Avatar profile={invite.user[0]} width={8} ring={8} height={8} border={0} gradient={undefined} />
                  <span className="ml-2 font-semibold">{invite.user[0].username}</span>
                </div>
                <div className="flex items-center">
                  <span className={`text-red-600 ml-1`}>
                    <div className="flex gap-1">
                      <span>Invite has been claimed</span>
                      <XCircleIcon width={16} />
                    </div>
                  </span>
                </div>
              </div>
            )}
            {invite &&
              !invite.code[0].claimed_by &&
              levelToUnlock != invite.code[0].type &&
              profile.id != invite.code[0].user_id && (
                <div className="flex btn btn-neutral h-full items-center justify-between pt-2 pb-2 mt-4 mb-2">
                  <div className="flex items-center">
                    <Avatar profile={invite.user[0]} width={8} ring={8} height={8} border={0} gradient={undefined} />
                    <span className="ml-2 font-semibold">{invite.user[0].username}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-red-600 ml-1`}>
                      <div className="flex gap-1">
                        <span>Invite level mismatch</span>
                        <XCircleIcon width={16} />
                      </div>
                    </span>
                  </div>
                </div>
              )}
            {invite && !invite.code[0].claimed_by && profile.id == invite.code[0].user_id && (
              <div className="flex btn btn-neutral h-full items-center justify-between pt-2 pb-2 mt-4 mb-2">
                <div className="flex items-center">
                  <Avatar profile={invite.user[0]} width={8} ring={8} height={8} border={0} gradient={undefined} />
                  <span className="ml-2 font-semibold">{invite.user[0].username}</span>
                </div>
                <div className="flex items-center">
                  <span className={`text-red-600 ml-1`}>
                    <div className="flex gap-1">
                      <span>Cannot invite yourself</span>
                      <XCircleIcon width={16} />
                    </div>
                  </span>
                </div>
              </div>
            )}
            {invite &&
              !invite.code[0].claimed_by &&
              levelToUnlock == invite.code[0].type &&
              profile.id != invite.code[0].user_id && (
                <>
                  <button className="font-semibold flex items-center" onClick={handleBack}>
                    <ArrowLeftIcon />
                    Back
                  </button>
                  <div className="flex btn btn-neutral h-full items-center justify-between pt-2 pb-2 mt-4 mb-2">
                    <div className="flex items-center">
                      <span className="text-primary mr-1">from:</span>
                      <Avatar profile={invite.user[0]} width={8} ring={8} height={8} border={0} gradient={undefined} />
                      <span className="ml-2 font-semibold">{invite.user[0].username}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`text-green-600 ml-1`}>
                        <div className="flex gap-1">
                          <span>
                            {invite.code[0].type == 1 && "Creator Invite"}
                            {invite.code[0].type == 2 && "Builder Invite"}
                            {invite.code[0].type == 3 && "Architect Invite"}
                            {invite.code[0].type == 4 && "Visionairy Invite"}
                            {invite.code[0].type == 5 && "God-mode Invite"}
                          </span>
                          <CheckCircleIcon width={16} />
                        </div>
                      </span>
                    </div>
                  </div>
                </>
              )}
              {success && JSON.stringify(success)}
            {checkButton && (
              <div className="btn btn-primary w-full mt-4" onClick={handleCheck}>
                Check {isProcessing && <span className="loading loading-ring loading-md"></span>}
              </div>
            )}
            {unlockButton && (
              <div className="btn btn-primary w-full mt-4" onClick={handleUnlock}>
                Unlock {isProcessing && <span className="loading loading-ring loading-md"></span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
