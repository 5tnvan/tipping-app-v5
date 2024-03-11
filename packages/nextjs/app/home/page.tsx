"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppContext } from "../context";
import { NextPage } from "next";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { useFollowers } from "~~/hooks/app/useFollowers";

const HomePage: NextPage = () => {
  const router = useRouter();
  const { isLoadingAuth, isAuth, profile, refetchAuth } = useContext(AppContext);
  const { isLoading: isLoadingFollowers, followersData, refetch: refetchFollowers } = useFollowers(profile.id);
  const [showFollow, setShowFollow] = useState("followers");

  console.log(followersData.followers);
  console.log(followersData.following);

  if (isAuth == "no") {
    return (
      <>
        {/* CONTENT */}
        <div id="wildpay-is-not-auth" className="z-10 pt-28">
          <div className="font-semibold text-3xl mb-5">{"You are not logged in."}</div>
          <Link href="/login" className="btn text-base mb-3 w-full">
            {"Go to login"}
          </Link>
        </div>
      </>
    );
  }
  if (isAuth == "yes") {
    return (
      <>
        {/* CONTENT */}
        <div id="wildpay-is-auth-home" className="z-10 pt-28 text-black">
          {/* HOME */}
          <div className="text-3xl mb-2">Home</div>
          {/* FOLLOWERS */}
          <div className="flex mb-3">
            <button className="mr-2" onClick={() => setShowFollow("followers")}>
              <span className="font-semibold">Followers</span> <span>{followersData?.followersCount}</span>
            </button>
            <button className="mr-2" onClick={() => setShowFollow("following")}>
              <span className="font-semibold">Following</span> <span>{followersData?.followingCount}</span>
            </button>
          </div>
          {/* FOLLOWERS DATA */}
          {showFollow == "followers" && (
            <ul id="followers" className="flex">
              {followersData?.followers.map(followers => (
                <button
                  key={followers}
                  className="flex flex-col items-center mr-2"
                  onClick={() => router.push(`/${followers.username}`)}
                >
                  <Avatar profile={followers} width={12} />
                  {followers.username}
                </button>
              ))}
            </ul>
          )}

          {showFollow == "following" && (
            <div id="following" className="flex">
              {followersData?.following.map(following => (
                <button
                  key={following}
                  className="flex flex-col items-center mr-2"
                  onClick={() => router.push(`/${following.username}`)}
                >
                  <Avatar profile={following} width={12} />
                  {following.username}
                </button>
              ))}
            </div>
          )}

          {/* TRANSACTIONS */}
          <div className="flex mt-3">
            <button className="mr-2">
              <span className="font-semibold">Transactions</span> <span>3</span>
            </button>
          </div>
        </div>
      </>
    );
  }
};
export default HomePage;
