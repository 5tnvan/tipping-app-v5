"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppContext, FollowersContext } from "../context";
import { NextPage } from "next";
import { Avatar } from "~~/components/app/authentication/Avatar";

const HomePage: NextPage = () => {
  const router = useRouter();
  const { isLoadingAuth, isAuth, profile, refetchAuth } = useContext(AppContext);
  const { isLoadingFollowers, followersData, refetchFollowers } = useContext(FollowersContext);
  const [showFollow, setShowFollow] = useState("followers");

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
              <span className={`${showFollow == "followers" && "font-semibold"}`}>Followers </span>
              <span>({followersData?.followersCount})</span>
            </button>
            <button className="mr-2" onClick={() => setShowFollow("following")}>
              <span className={`${showFollow == "following" && "font-semibold"}`}>Following </span>
              <span>({followersData?.followingCount})</span>
            </button>
          </div>
          {/* FOLLOWERS DATA */}
          {isLoadingFollowers && <div>is loading</div>}
          {!isLoadingFollowers && Array.isArray(followersData.following) && showFollow == "followers" && (
            <ul id="followers" className="flex">
              {followersData?.followers.map(followers => (
                <Link href={`/${followers.username}`} key={followers} className="flex flex-col items-center mr-2">
                  <Avatar profile={followers} width={12} />
                  {followers.username}
                </Link>
              ))}
            </ul>
          )}

          {!isLoadingFollowers && Array.isArray(followersData.following) && showFollow == "following" && (
            <div id="following" className="flex">
              {followersData?.following.map(following => (
                <Link href={`/${following.username}`} key={following} className="flex flex-col items-center mr-2">
                  <Avatar profile={following} width={12} />
                  {following.username}
                </Link>
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
