"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AppContext } from "../context";
import { setUsernameCookie } from "../signup/actions";
import type { NextPage } from "next";
import { EthIcon } from "~~/components/assets/EthIcon";
import { InstagramIcon } from "~~/components/assets/InstagramIcon";
import { TiktokIcon } from "~~/components/assets/TiktokIcon";
import { TwitterIcon } from "~~/components/assets/TwitterIcon";
import { YoutubeIcon } from "~~/components/assets/YoutubeIcon";
import { isUsernameTaken } from "~~/hooks/supabase";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const GetStarted: NextPage = () => {
  const router = useRouter();
  const { isAuth } = useContext(AppContext);

  const [username, setUsername] = useState<string>("");
  const [availability, setAvailability] = useState<[string, string, string]>(["", "badge-info", "btn-disabled"]);

  // perform a side effect as user types 'username'
  useEffect(() => {
    (async () => {
      let warningText = "";
      let badgeClass = "";
      let btnClass = "btn-disabled";

      if (username.length === 0) {
        warningText = "";
      } else if (username.length < 4) {
        warningText = "Type more";
        badgeClass = "badge-warning";
      } else {
        const taken = await isUsernameTaken(username);
        warningText = taken ? "Taken" : "Available";
        badgeClass = taken ? "badge-error" : "badge-success";
        btnClass = taken ? "btn-disabled" : "";
      }

      setAvailability([warningText, badgeClass, btnClass]);
    })();
  }, [username]);

  if (isAuth == "yes") {
    router.push("/profile/view");
  }

  if (isAuth == "no") {
    return (
      <>
        {/* GET STARTED */}
        <div id="get-started" className="z-10 flex flex-col grow justify-center">
          {/* GET STARTED HERO */}
          <div className="font-light mb-3 flex justify-between">
            <div className="custom-text-blue font-semibold text-3xl">Dare to be paid?</div>
            <div className="flex justify-center">
              <EthIcon width={"20px"} height={"20px"} />
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
          <div className="scr mb-6">
            <div className="scr-item custom-bg-image-01"></div>
            <div className="scr-item custom-bg-image-01"></div>
            <div className="scr-item custom-bg-image-01"></div>
          </div>

          {/* GET STARTED CLAIM LINK */}
          <form id="wildpay-claim">
            <label className="input flex items-center mb-3">
              <Image alt="wildpay" src="/wildpay-logo.svg" width={20} height={20} className="mr-2" />

              <div id="wildpay-claim-domain" className="font-semibold tracking-wide">
                wildpay.eth /{" "}
              </div>
              {/* GET STARTED CLAIM LINK INPUT */}
              <input
                id="username"
                name="username"
                type="text"
                className="grow tracking-wider ml-1"
                placeholder="yourname"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />

              {/* GET STARTED CLAIM LINK AVAILABILITY */}
              <span id="wildpay-claim-avail" className={`${availability[1]} badge`}>
                {availability[0]}
              </span>
            </label>

            {/* GET STARTED CLAIM LINK CONFIRM */}
            <button className={`btn btn-neutral text-base w-full ${availability[2]}`} formAction={setUsernameCookie}>
              Claim
            </button>
          </form>
        </div>

        {/* GET STARTED SOCIALS */}
        <div id="cust-socials" className="flex justify-center mb-5">
          <YoutubeIcon handle="heartip" />
          <TwitterIcon handle="heartip" />
          <InstagramIcon handle="heartip" />
          <TiktokIcon handle="heartip" />
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default GetStarted;
