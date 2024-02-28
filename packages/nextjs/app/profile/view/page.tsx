"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import { getUser } from "~~/app/profile/actions";
import GreetingsTable from "~~/app/subgraph/_components/GreetingsTable";
import { SocialIcons } from "~~/components/assets/SocialIcons";
import Tipping2 from "~~/components/scaffold-eth/Tipping2";
import { SumGreetingsValue } from "~~/components/subgraph/SumGreetingsValue";
import "~~/styles/app-profile.css";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const ProfileView: NextPage = () => {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [isError, setIsError] = useState(true);
  const [user, setUser] = useState({
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
  });

  //GET: getUser | get: username, email
  const getUsersData = async () => {
    const data = await getUser();
    if (data.error != null) {
      router.push("/login");
    }
    setIsError(false);
    setUser(data.user);
  };

  React.useEffect(() => {
    getUsersData();
  }, []);

  const soc = {
    yt: { val: user.youtube, link: "https://youtube.com/" + user.youtube },
    ig: { val: user.instagram, link: "https://instagram.com/" + user.instagram },
    tw: { val: user.twitter, link: "https://x.com/" + user.twitter },
    tt: { val: user.tiktok, link: "https://tiktok.com/" + user.tiktok },
  };

  //ONLICK: handleButtonClick | show modal
  const handleButtonClick = () => {
    setIsClicked(true);
    if (document.getElementById("my_modal_3") != null) {
      document.getElementById("my_modal_3").showModal();
    }
  };

  if (!isError) {
    return (
      <>
        <div id="profileView" className="profile mt-5 mb-5">

          {/* Intro */}
          <div className="intro flex justify-between mt-5 mb-5">
            <div className="flex">
              <div className="left avatar mr-5">
                <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {user.avatar_url != null ? (
                    <Image alt="SE2 logo" src={user.avatar_url} width={500} height={500} />
                  ) : (
                    <Image
                      alt="SE2 logo"
                      src="https://media1.tenor.com/m/_wA-bSNP3KAAAAAC/pixel-art-pixels.gif"
                      width={500}
                      height={500}
                    />
                  )}
                </div>
              </div>
              <div className="right info flex justify-center flex-col">
                <div className="">@{user.username}</div>
                <SocialIcons soc={soc} />
              </div>
            </div>

            <div className="text-4xl flex justify-center items-center">
              <span>
                <SumGreetingsValue />
              </span>
              <span className="text-xl"> Ξ</span>
            </div>
          </div>
          {/* Tip */}
          <div>
            <button className="btn-blue btn w-full" onClick={() => handleButtonClick()}>
              Tip Now
            </button>
          </div>

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <Tipping2 />
              </form>
            </div>
          </dialog>

          {/* QR */}
          <div className="qr scr">
            {/* Card 3 */}
            <div className="scr-item pattern-03">
              <div className="left">
                <div className="font-semibold">❤️</div>
                <div className="top">thanks for tipping hearts!</div>
                <div className="">Exp 24:00</div>
              </div>
              <div className="copylink"></div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="latest"></div>
          <GreetingsTable />
        </div>
      </>
    );
  }
};
export default ProfileView;
