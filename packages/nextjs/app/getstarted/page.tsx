"use client";

import { useCallback, useState } from "react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUser } from "../profile/actions";
import type { NextPage } from "next";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const GetStarted: NextPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState("init");

  /* SIDE EFFECTS AND CALLBACKS */
  //Check if user is logged in, if yes then initialize profile
  const initUser = useCallback(async () => {
    const data = await getUser();
    if (!data.error) {
      router.push("/profile/view");
    } else {
      setIsLogin("notloggedin");
    }
  }, []);

  React.useEffect(() => {
    initUser();
  }, []);

  if (isLogin == "init") {
    return null;
  }

  if (isLogin == "notloggedin") {
    return (
      <>
        {/* CONTENT */}
        <div className="cont z-10">
          {/* Hero */}
          <div className="headr font-semibold">
            <div>Receive ❤️ coins </div>
            <div className="animation">
              <div className="first">
                <div>$5</div>
              </div>
              <div className="second">
                <div>$10</div>
              </div>
              <div className="third">
                <div>$15</div>
              </div>
            </div>
          </div>
          <div className="text-3xl">instantly, from anyone</div>

          {/* Scroll Snap */}
          <div className="scr">
            {/* Card 3 */}
            <div className="scr-item pattern-01">
              <div className="left">
                <div className="font-semibold">❤️</div>
                <div className="top">thanks for tipping hearts!</div>
                <div className="">Exp 24:00</div>
              </div>
            </div>
            <div className="scr-item pattern-02">
              <div className="left">
                <div className="font-semibold">❤️</div>
                <div className="top">thanks for tipping hearts!</div>
                <div className="">Exp 24:00</div>
              </div>
            </div>
            <div className="scr-item pattern-03">
              <div className="left">
                <div className="font-semibold">❤️</div>
                <div className="top">thanks for tipping hearts!</div>
                <div className="">Exp 24:00</div>
              </div>
            </div>
          </div>

          {/* Button */}
          <Link href="/claimlink" className="btn btn-neutral">
            {"Get started—it's free"}
          </Link>
        </div>
      </>
    );
  }
};

export default GetStarted;