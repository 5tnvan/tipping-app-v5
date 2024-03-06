"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { NextPage } from "next";
import { getProfile } from "~~/app/(profile)/[username]/actions";
import Tipping2 from "~~/components/app/tipping/Tipping2";
import { CopyIcon } from "~~/components/assets/CopyIcon";
import TipsTable from "~~/components/subgraph/TipsTable";
import "~~/styles/app-profile.css";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

/**
 * ROUTE: /[username]
 * DESCRIPTION: Public Profile
 **/

const ProfileUsername: NextPage = ({ params }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfile, setIsProfile] = useState("init");
  const [profile, setProfile] = useState({
    id: null,
    updated_at: null,
    username: null,
    full_name: null,
    avatar_url: null,
    website: null,
    youtube: null,
    instagram: null,
    twitter: null,
    tiktok: null,
    wallet_id: null,
  });

  const soc = {
    yt: { val: profile.youtube, link: "https://youtube.com/" + profile.youtube },
    ig: { val: profile.instagram, link: "https://instagram.com/" + profile.instagram },
    tw: { val: profile.twitter, link: "https://x.com/" + profile.twitter },
    tt: { val: profile.tiktok, link: "https://twitter.com/" + profile.tiktok },
  };

  //Initialize user's public profile based on @params.username
  const initProfile = useCallback(async () => {
    const profile = await getProfile(params.username);

    if (profile) {
      setIsProfile("profile");
      setProfile(profile);
    } else {
      setIsProfile("noprofile");
    }
  }, [params.username]);

  React.useEffect(() => {
    console.log("Effect: Load Profile");
    initProfile();
  }, []);

  //On click Tip Now, show modal
  const handleTipNow = () => {
    setIsModalOpen(true);
  };

  //rendering HTML

  if (isProfile == "init") {
    return null;
  }

  if (isProfile == "noprofile") {
    return (
      <>
        <div>user not found</div>
      </>
    );
  }

  if (isProfile == "profile") {
    return (
      <>
        {/* Pay Now */}
        <div className="mb-5 z-10 relative">
          <button className="btn-blue btn w-full" onClick={() => handleTipNow()}>
            Pay Now
          </button>
        </div>
        <div id="wildpay-username" className="profile mt-5 mb-5 z-10">
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
                <div>@{profile.username}</div>
                <div>{profile.wallet_id}</div>

                <Tipping2 receiver={profile.wallet_id} />
              </form>
            </div>
          </dialog>

          {/* Scroll Snap */}
          <div className="scr mb-6">
            {/* Card 3 */}
            <div className="scr-item custom-bg-image-01 flex items-center relative">
              <div className=" text-6xl font-black custom-difference-blend">{profile.username}</div>
              <div className="absolute url flex custom-bg-blue pt-2 pb-2 pr-3 pl-3 text-white rounded-full text-sm items-center">
                <div className="mr-2">wildpay.eth/{profile.username}</div>
                <CopyIcon />
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="latest"></div>
          <TipsTable receiverAddress={profile.wallet_id} />
        </div>
      </>
    );
  }
};
export default ProfileUsername;
