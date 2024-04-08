"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AppContext } from "../context";
import { setUsernameCookie } from "../signup/actions";
import type { NextPage } from "next";
import { EthIcon } from "~~/components/assets/EthIcon";
import { isUsernameTaken } from "~~/hooks/supabase";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const GetStarted: NextPage = () => {
  const router = useRouter();
  const { isAuth } = useContext(AppContext);

  const [username, setUsername] = useState<string>("");
  const [availability, setAvailability] = useState<[string, string, string, string]>([
    "",
    "",
    "btn-light",
    "Get started-it's free",
  ]);

  // perform a side effect as user types 'username'
  useEffect(() => {
    (async () => {
      let warningText = "";
      let badgeClass = "";
      let btnClass = "btn-neutral";
      let btnValue = "Get started-it's free";

      if (username.length === 0) {
        warningText = "";
      } else if (username.length < 3) {
        warningText = "Type more";
        badgeClass = "badge-warning";
      } else {
        const taken = await isUsernameTaken(username);
        warningText = taken ? "Taken" : "Available";
        badgeClass = taken ? "badge-error" : "badge-success";
        btnValue = taken ? "Claim" : "Claim";
        btnClass = taken ? "btn-neutral btn-disabled" : "btn-primary";
      }

      setAvailability([warningText, badgeClass, btnClass, btnValue]);
    })();
  }, [username]);

  if (isAuth == "yes") {
    router.push("/home");
  }

  if (isAuth == "no") {
    return (
      <>
        {/* GET STARTED */}
        <div id="wildpay-get-started" className="z-10 flex flex-col grow justify-center pb-10">
          {/* GET STARTED HERO */}
          <div className="font-light mb-3 flex justify-between">
            <div className="custom-text-blue font-semibold text-3xl">Dare to get paid?</div>
            {/* GET STARTED ETH ANIMATION */}
            <div className="flex justify-center">
              <span className="pt-1">
                <EthIcon width={"20px"} height={"20px"} fill="#3C3C3C" />
              </span>
              <div className="animation text-xl font-semibold">
                <div className="first">
                  <div>1.2Ξ</div>
                </div>
                <div className="second">
                  <div>2.3Ξ</div>
                </div>
                <div className="third">
                  <div>3.5Ξ</div>
                </div>
              </div>
            </div>
          </div>

          {/* GET STARTED CARDS */}
          {/* <div className="scr mb-6">
            <div className="scr-item custom-bg-image-01"></div>
          </div> */}
          <div className="container mb-4">
            <div className="gradient">
              <div className="scr">
                <div className="scr-item custom-bg-image-01"></div>
              </div>
            </div>
          </div>

          {/* GET STARTED CLAIM USERNAME */}
          <form id="wildpay-claim">
            <label className="input flex items-center mb-3">
              <Image alt="wildpay" src="/wildpay-logo.svg" width={20} height={20} className="mr-2" />

              <div id="wildpay-claim-domain" className="font-semibold tracking-wide">
                wildpay.eth /{" "}
              </div>
              {/* GET STARTED USERNAME INPUT */}
              <input
                id="username"
                name="username"
                type="text"
                className="grow tracking-wider ml-1 bg-white"
                placeholder="yourname"
                pattern="^[a-z][a-z0-9_]{2,15}$"
                title="Only letters, numbers, and underscores."
                value={username}
                onChange={e => setUsername(e.target.value)}
              />

              {/* GET STARTED USERNAME AVAILABILITY */}
              <span id="wildpay-claim-avail" className={`${availability[1]} badge`}>
                {availability[0]}
              </span>
            </label>

            {/* GET STARTED USERNAME CONFIRM */}
            <button
              className={`btn text-base w-full ${availability[2]}`}
              formAction={setUsernameCookie}
              disabled={!username.trim()}
            >
              {availability[3]}
            </button>
          </form>
        </div>

        {/* GET STARTED SOCIALS */}
        {/* <div id="wildpay-socials" className="flex justify-center mb-5">
          <div className="mr-2">
            <YoutubeIcon handle="wildpay" />
          </div>
          <div className="mr-2">
            <TwitterIcon handle="wildpay" />
          </div>
          <div className="mr-2">
            <InstagramIcon handle="wildpay" />
          </div>
          <div className="">
            <TiktokIcon handle="wildpay" />
          </div>
        </div> */}
      </>
    );
  } else {
    return null;
  }
};

export default GetStarted;
