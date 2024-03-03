"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import Tipping2 from "~~/components/app/tipping/Tipping2";
import { SocialIcons } from "~~/components/assets/SocialIcons";
import TipsTable from "~~/components/subgraph/TipsTable";
import TipsValueSum from "~~/components/subgraph/TipsValueSum";
import { useAuthentication } from "~~/hooks/app/useAuthentication";
import "~~/styles/app-profile.css";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const ProfileView: NextPage = () => {
  const router = useRouter();
  const { isAuth, profile } = useAuthentication();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const soc = {
    yt: { val: profile.youtube, link: "https://youtube.com/" + profile.youtube },
    ig: { val: profile.instagram, link: "https://instagram.com/" + profile.instagram },
    tw: { val: profile.twitter, link: "https://x.com/" + profile.twitter },
    tt: { val: profile.tiktok, link: "https://twitter.com/" + profile.tiktok },
  };

  /* ROUTE */
  if (isAuth == "no") {
    router.push("/login");
  }

  if (isAuth == "yes") {
    return (
      <>
        <div className="custom-profile-bg z-0"></div>
        <div id="profileView" className="profile mt-5 mb-5 z-10">
          {/* Intro */}
          <div className="intro flex justify-between mb-7 text-black">
            <div className="flex">
              <div className="left avatar mr-5">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {profile.avatar_url && <Image alt="SE2 logo" src={profile.avatar_url} width={500} height={500} />}
                </div>
              </div>
              <div className="right info flex justify-center flex-col">
                <div className="font-semibold">@{profile.username}</div>
                <SocialIcons soc={soc} />
              </div>
            </div>

            <div className="text-4xl flex justify-center items-center">
              <span>
                <TipsValueSum receiverAddress={profile.wallet_id} />
              </span>
              <span className="text-xl"> Ξ</span>
            </div>
          </div>
          {/* Tip Now */}
          <div className="mb-5">
            <button
              className="btn-neutral btn w-full text-base custom-bg-blue border-0"
              onClick={() => router.push("edit")}
            >
              Edit Profile
            </button>
          </div>

          {/* Modal */}
          <dialog id="my_modal_3" className="modal" open={isModalOpen}>
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
                <Tipping2 />
              </form>
            </div>
          </dialog>

          {/* Scroll Snap */}
          <div className="scr mb-6">
            {/* Card 3 */}
            <div className="scr-item bg-image-01"></div>
          </div>
          {/* Card 3 */}
          <div className="latest"></div>
          <TipsTable receiverAddress={profile.wallet_id} />
        </div>
      </>
    );
  }
};
export default ProfileView;
