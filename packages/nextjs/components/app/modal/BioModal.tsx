import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TimeAgo } from "../TimeAgo";
import { Avatar } from "../authentication/Avatar";
import { BackgroundGradient } from "../ui/background-gradient";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";
import { AuthContext, UserFollowsContext } from "~~/app/context";

type Props = {
  isOpen: any;
  onCta: any;
  onClose: any;
  data: any;
};

export const BioModal = ({ isOpen, onCta, onClose, data }: Props) => {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);
  const { followed } = useContext(UserFollowsContext) || {};

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const handleCta = () => {
    if (isAuthenticated == "no") {
      if (data.latestBio?.cta == 0) {
        //pay now
        router.push("/login");
      } else if (data?.cta == 1) {
        //follow me
        router.push("/login");
      }
    } else if (isAuthenticated == "yes") {
      if (data.latestBio?.cta == 0) {
        onCta(0); //pay now
      } else if (data.latestBio?.cta == 1 && !followed) {
        onCta(1); //follow me
      } else if (data.latestBio?.cta == 1 && followed) {
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

          <BackgroundGradient className="rounded-[22px] p-5 pt-10 bg-white dark:bg-zinc-900">
            <div className="flex justify-between">
              <div className="flex items-center">
                <Avatar profile={data.profile} width={8} height={8} border={2} ring={9} gradient={"g-tropical"} />
                <Link href={`/${data.profile.username}`} className="ml-2 font-semibold text-primary mr-2">
                  @{data.profile.username}
                </Link>
                <span className="text-slate-500">
                  <TimeAgo timestamp={data?.created_at} />
                </span>
              </div>
              <div className="flex items-center gap-1">
                <EyeIcon width={14} />
                {data.latestBio?.views}
              </div>
            </div>
            <TextGenerateEffect words={data.latestBio?.content} />
            <div className="btn btn-primary w-full mt-5" onClick={handleCta}>
              {data.latestBio?.cta == 0 && "Fund Now"}
              {data.latestBio?.cta == 1 && !followed && "Follow me"}
              {data.latestBio?.cta == 1 && followed && (
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
  );
};
