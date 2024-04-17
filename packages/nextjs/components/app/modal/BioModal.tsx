import React from "react";
import { TimeAgo } from "../TimeAgo";
import { Avatar } from "../authentication/Avatar";
import { BackgroundGradient } from "../ui/background-gradient";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { EyeIcon } from "@heroicons/react/24/solid";

type Props = {
  isOpen: any;
  onClose: any;
  data: any;
};

export const BioModal = ({ isOpen, onClose, data }: Props) => {
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  console.log(data);

  return (
    <div className="wildui-modal-container w-full h-full top-0 left-0 fixed flex justify-center items-start z-100">
      <div className="wildui-modal-child flex flex-col text-black z-30 mt-4">
        {/* FOLLOWERS FRAME */}
        <div className="modal-content grow rounded-3xl">
          {/* FOLLOWERS CLOSE */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-50" onClick={handleClose}>
            ✕
          </button>
          <div>
            <BackgroundGradient className="rounded-[22px] p-5 pt-10 bg-white dark:bg-zinc-900">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Avatar profile={data.profile} width={8} ring={false} />
                  <span className="ml-2 font-semibold text-primary mr-2">@{data.profile.username}</span>
                  <span className="text-slate-500">
                    <TimeAgo timestamp={data.bios[0]?.created_at} />
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <EyeIcon width={14} />
                  {data.bios[0]?.views}
                </div>
              </div>
              <TextGenerateEffect words={data.bios[0]?.content} />
              <div className="btn btn-primary w-full mt-5">{data.bios[0]?.cta == 0 ? "Pay now" : "Follow Me"}</div>
            </BackgroundGradient>
          </div>
        </div>
      </div>
    </div>
  );
};
