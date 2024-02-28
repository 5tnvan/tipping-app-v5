"use client";

import React, { useState } from "react";
import { NextPage } from "next";
import { getUser } from "~~/app/profile/actions";
import { SocialIcons } from "~~/components/assets/SocialIcons";
import Tipping2 from "~~/components/scaffold-eth/Tipping2";
import { SumGreetingsValue } from "~~/components/subgraph/SumGreetingsValue";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";
import "~~/styles/app-profile.css";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";
import { redirect } from "next/navigation";

const ProfileTip: NextPage = () => {
  const [isClicked, setIsClicked] = useState(false);

  const [user, setUser] = React.useState({
    email: "",
    username: "",
  });

  //GET: getUser | get: username, email
  const getUsersData = async () => {
    const data = await getUser();
    setUser({
      email: data.email ?? "",
      username: data.username || "",
    });
  };

  React.useEffect(() => {
    getUsersData();
  }, []); // Empty dependency array means it runs only once after mounting

  //HOOK: useScaffoldContractRead | get: balance
  const { data: balance } = useScaffoldContractRead({
    contractName: "OriginalContract",
    functionName: "balance",
    args: ["0x45C5e7aa406286485bfcfc8307B26c4bF454cE91"],
  });

  const handleButtonClick = () => {
    redirect("/profile/tip");
  };

  // Display user profile data
  return (
    <>
      <div id="profileView" className="profile mt-5 mb-5">
        {/* Hero: */}
        {/* <div className=" alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {"Hello, "}
          {user.email}
        </div> */}

        {/* Intro */}
        <div className="intro flex justify-between mt-5 mb-5">
          <div className="flex">
            <div className="left avatar mr-5">
              <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="right info flex justify-center flex-col">
              <div className="">@{user.username}</div>
              <SocialIcons />
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
        {isClicked && <Tipping2 />}
      </div>
    </>
  );
};
export default ProfileTip;
