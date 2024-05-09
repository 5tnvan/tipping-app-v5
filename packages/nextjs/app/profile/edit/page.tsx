"use client";

import React, { useState } from "react";
import { useContext } from "react";
import Link from "next/link";
import { NextPage } from "next";
import { AuthUserContext, AuthContext } from "~~/app/context";
import { updateProfileSocial } from "~~/app/profile/actions";
import { FarcasterIcon } from "~~/components/assets/FarcasterIcon";
import { InstagramIcon } from "~~/components/assets/InstagramIcon";
import { LensIcon } from "~~/components/assets/LensIcon";
import { TiktokIcon } from "~~/components/assets/TiktokIcon";
import { TwitterIcon } from "~~/components/assets/TwitterIcon";
import { YoutubeIcon } from "~~/components/assets/YoutubeIcon";
import "~~/styles/app-profile.css";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

/**
 * ROUTE: /profile/edit
 * DESCRIPTION: Private Profile Edit
 **/

const ProfileEdit: NextPage = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { profile, refetchAuthUser } = useContext(AuthUserContext);

  const [socialMedia, setSocialMedia] = useState({
    lens: true,
    farcaster: true,
    youtube: true,
    instagram: true,
    twitter: true,
    tiktok: true,
    lensInput: "",
    farcasterInput: "",
    youtubeInput: "",
    instagramInput: "",
    twitterInput: "",
    tiktokInput: "",
  });

  const handleSwitch = (social: keyof typeof socialMedia) => {
    setSocialMedia(prevState => ({
      ...prevState,
      [social]: !prevState[social],
    }));
  };

  const handleSocialSave = async (social: keyof typeof socialMedia) => {
    const inputVal = socialMedia[`${social}Input` as keyof typeof socialMedia];
    updateProfileSocial(social, inputVal);
    handleSwitch(social);
    refetchAuthUser();
  };

  /* RENDER HTML */
  if (isAuthenticated == "no") {
    return (
      <div id="wildpay-is-not-auth" className="z-10 pt-28 pl-6 pr-6">
        <div className="font-semibold text-3xl mb-5">{"You are not logged in."}</div>
        <Link href="/login" className="btn text-base mb-3 w-full">
          {"Go to login"}
        </Link>
      </div>
    );
  }

  if (isAuthenticated == "yes") {
    return (
      <>
        {/* CTA */}
        <div id="wildpay-cta" className="ml-6 mr-6 z-10 relative">
          <Link href="/profile/view">
            <button className="btn-primary btn w-full text-base">View Profile</button>
          </Link>
        </div>
        <div id="wildpay-profile-edit" className="wildui-generic-scroll-a overflow-scroll p-6 z-10">
          {/* SOCIAL */}
          <div className="mb-3">Social links:</div>

          {/* Lens Protocol */}
          <div className="mb-3">
            {socialMedia.lens ? (
              <label className="input input-bordered flex justify-between gap-2 pr-0">
                <div className="opacity-70 flex items-center gap-2">
                  <LensIcon width={16} height={14} />
                  <span className="wildpay-soc-label">lens.xyz /</span>
                  <input type="text" className="bg-white" placeholder={profile.lens || ""} disabled />
                </div>
                <button className="btn btn-accent" onClick={() => handleSwitch("lens")}>
                  {profile.lens && profile.lens?.length > 0 ? "Edit" : "Add"}
                </button>
              </label>
            ) : (
              <label className="input input-bordered flex items-center gap-2 pr-0">
                <LensIcon width={16} height={14} />
                <input
                  type="text"
                  className="bg-white grow"
                  placeholder={profile.lens || ""}
                  value={socialMedia.lensInput}
                  onChange={e => setSocialMedia({ ...socialMedia, lensInput: e.target.value })}
                />
                <div className="flex justify-end">
                  <button className="btn btn-accent" onClick={() => handleSocialSave("lens")}>
                    Save
                  </button>
                  <button className="btn btn-secondary btn-outline" onClick={() => handleSwitch("lens")}>
                    Cancel
                  </button>
                </div>
              </label>
            )}
          </div>

          {/* Farcaster */}
          <div className="mb-3">
            {socialMedia.farcaster ? (
              <label className="input input-bordered flex justify-between gap-2 pr-0">
                <div className="opacity-70 flex items-center gap-2">
                  <FarcasterIcon width={14} height={14} />
                  <span className="wildpay-soc-label">warpcast.com /</span>
                  <input type="text" className="bg-white" placeholder={profile.farcaster || ""} disabled />
                </div>
                <button className="btn btn-accent" onClick={() => handleSwitch("farcaster")}>
                  {profile.farcaster && profile.farcaster?.length > 0 ? "Edit" : "Add"}
                </button>
              </label>
            ) : (
              <label className="input input-bordered flex items-center gap-2 pr-0">
                <FarcasterIcon width={14} height={14} />
                <input
                  type="text"
                  className="bg-white grow"
                  placeholder={profile.farcaster || ""}
                  value={socialMedia.farcasterInput}
                  onChange={e => setSocialMedia({ ...socialMedia, farcasterInput: e.target.value })}
                />
                <div className="flex justify-end">
                  <button className="btn btn-accent" onClick={() => handleSocialSave("farcaster")}>
                    Save
                  </button>
                  <button className="btn btn-secondary btn-outline" onClick={() => handleSwitch("farcaster")}>
                    Cancel
                  </button>
                </div>
              </label>
            )}
          </div>

          {/* Youtube */}
          <div className="mb-3">
            {socialMedia.youtube ? (
              <label className="input input-bordered flex justify-between gap-2 pr-0">
                <div className="opacity-70 flex items-center gap-2">
                  <YoutubeIcon width={14} height={14} />
                  <span className="wildpay-soc-label">youtube.com /</span>
                  <input type="text" className="bg-white" placeholder={profile.youtube || ""} disabled />
                </div>
                <button className="btn btn-accent" onClick={() => handleSwitch("youtube")}>
                  {profile.youtube && profile.youtube?.length > 0 ? "Edit" : "Add"}
                </button>
              </label>
            ) : (
              <label className="input input-bordered flex items-center gap-2 pr-0">
                <YoutubeIcon width={14} height={14} />
                <input
                  type="text"
                  className="bg-white grow"
                  placeholder={profile.youtube || ""}
                  value={socialMedia.youtubeInput}
                  onChange={e => setSocialMedia({ ...socialMedia, youtubeInput: e.target.value })}
                />
                <div className="flex justify-end">
                  <button className="btn btn-accent" onClick={() => handleSocialSave("youtube")}>
                    Save
                  </button>
                  <button className="btn btn-secondary btn-outline" onClick={() => handleSwitch("youtube")}>
                    Cancel
                  </button>
                </div>
              </label>
            )}
          </div>

          {/* Instagram */}
          <div className="mb-3">
            {socialMedia.instagram ? (
              <label className="input input-bordered flex justify-between gap-2 pr-0">
                <div className="opacity-70 flex items-center gap-2">
                  <InstagramIcon width={14} height={14} />
                  <span className="wildpay-soc-label">instagram.com /</span>
                  <input type="text" className="bg-white" placeholder={profile.instagram || ""} disabled />
                </div>
                <button className="btn btn-accent" onClick={() => handleSwitch("instagram")}>
                  {profile.instagram && profile.instagram?.length > 0 ? "Edit" : "Add"}
                </button>
              </label>
            ) : (
              <label className="input input-bordered flex items-center gap-2 pr-0">
                <InstagramIcon width={14} height={14} />
                <input
                  type="text"
                  className="grow bg-white"
                  placeholder={profile.instagram || ""}
                  value={socialMedia.instagramInput}
                  onChange={e => setSocialMedia({ ...socialMedia, instagramInput: e.target.value })}
                />
                <div className="flex justify-end">
                  <button className="btn btn-accent" onClick={() => handleSocialSave("instagram")}>
                    Save
                  </button>
                  <button className="btn btn-secondary btn-outline" onClick={() => handleSwitch("instagram")}>
                    Cancel
                  </button>
                </div>
              </label>
            )}
          </div>

          {/* Twitter */}
          <div className="mb-3">
            {socialMedia.twitter ? (
              <label className="input input-bordered flex justify-between gap-2 pr-0">
                <div className="opacity-70 flex items-center gap-2">
                  <TwitterIcon width={14} height={14} />
                  <span className="wildpay-soc-label">twitter.com /</span>
                  <input type="text" className="bg-white" placeholder={profile.twitter || ""} disabled />
                </div>
                <button className="btn btn-accent" onClick={() => handleSwitch("twitter")}>
                  {profile.twitter && profile.twitter?.length > 0 ? "Edit" : "Add"}
                </button>
              </label>
            ) : (
              <>
                <label className="input input-bordered flex items-center gap-2 pr-0">
                  <TwitterIcon width={14} height={14} />
                  <input
                    type="text"
                    className="grow bg-white"
                    placeholder={profile.twitter || ""}
                    value={socialMedia.twitterInput}
                    onChange={e => setSocialMedia({ ...socialMedia, twitterInput: e.target.value })}
                  />
                  <div className="flex justify-end">
                    <button className="btn btn-accent" onClick={() => handleSocialSave("twitter")}>
                      Save
                    </button>
                    <button className="btn btn-secondary btn-outline" onClick={() => handleSwitch("twitter")}>
                      Cancel
                    </button>
                  </div>
                </label>
              </>
            )}
          </div>

          {/* Tiktok */}
          <div className="mb-3">
            {socialMedia.tiktok ? (
              <label className="input input-bordered flex justify-between gap-2 pr-0">
                <div className="opacity-70 flex items-center gap-2">
                  <TiktokIcon width={14} height={14} />
                  <span className="wildpay-soc-label">tiktok.com /</span>
                  <input type="text" className="grow bg-white" placeholder={profile.tiktok || ""} disabled />
                </div>
                <button className="btn btn-accent" onClick={() => handleSwitch("tiktok")}>
                  {profile.tiktok && profile.tiktok?.length > 0 ? "Edit" : "Add"}
                </button>
              </label>
            ) : (
              <>
                <label className="input input-bordered flex items-center gap-2 pr-0">
                  <TiktokIcon width={14} height={14} />
                  <input
                    type="text"
                    className="grow bg-white"
                    placeholder={profile.tiktok || ""}
                    value={socialMedia.tiktokInput}
                    onChange={e => setSocialMedia({ ...socialMedia, tiktokInput: e.target.value })}
                  />
                  <div className="flex justify-end">
                    <button className="btn btn-accent" onClick={() => handleSocialSave("tiktok")}>
                      Save
                    </button>
                    <button className="btn btn-secondary btn-outline" onClick={() => handleSwitch("tiktok")}>
                      Cancel
                    </button>
                  </div>
                </label>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
};
export default ProfileEdit;
