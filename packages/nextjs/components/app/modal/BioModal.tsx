import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TimeAgo } from "../TimeAgo";
import { Avatar } from "../authentication/Avatar";
import { BackgroundGradient } from "../ui/background-gradient";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";
import { AppContext, PublicFollowersContext } from "~~/app/context";

type Props = {
  isOpen: any;
  onCta: any;
  onClose: any;
  data: any;
};

export const BioModal = ({ isOpen, onCta, onClose, data }: Props) => {
  const router = useRouter();
  const { isAuth } = useContext(AppContext);
  const { followersPublicData } = useContext(PublicFollowersContext) || {};

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const handleCta = () => {
    if (isAuth == "no") {
      if (data.bios[0]?.cta == 0) {
        //pay now
        router.push("/login");
      } else if (data.bios[0]?.cta == 1) {
        //follow me
        router.push("/login");
      }
    } else if (isAuth == "yes") {
      if (data.bios[0]?.cta == 0) {
        onCta(0); //pay now
      } else if (data.bios[0]?.cta == 1 && !followersPublicData?.followed) {
        onCta(1); //follow me
      } else if (data.bios[0]?.cta == 1 && followersPublicData?.followed) {
        onClose(); //following
      }
    }
  };

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
                  <Avatar profile={data.profile} width={8} height={8} border={2} ring={10} gradient={undefined} />
                  <Link href={`/${data.profile.username}`} className="ml-2 font-semibold text-primary mr-2">
                    @{data.profile.username}
                  </Link>
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
              <div className="btn btn-primary w-full mt-5" onClick={handleCta}>
                {data.bios[0]?.cta == 0 && "Pay now"}
                {data.bios[0]?.cta == 1 && !followersPublicData?.followed && "Follow me"}
                {data.bios[0]?.cta == 1 && followersPublicData?.followed && (
                  <>
                    Following
                    <CheckCircleIcon width={18} />
                  </>
                )}
              </div>
            </BackgroundGradient>
          </div>
        </div>
      </div>
    </div>
  );
};
