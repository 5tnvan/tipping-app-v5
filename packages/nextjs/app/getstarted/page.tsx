"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { claimLink } from "../claimlink/actions";
import type { NextPage } from "next";
import { EthIcon } from "~~/components/assets/EthIcon";
import { InstagramIcon } from "~~/components/assets/InstagramIcon";
import { LoginIcon } from "~~/components/assets/LoginIcon";
import { TiktokIcon } from "~~/components/assets/TiktokIcon";
import { TwitterIcon } from "~~/components/assets/TwitterIcon";
import { YoutubeIcon } from "~~/components/assets/YoutubeIcon";
import { useAuthentication } from "~~/hooks/app/useAuthentication";
import { useUsernameAvailability } from "~~/hooks/supabase";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const GetStarted: NextPage = () => {
  const router = useRouter();
  const { isAuth } = useAuthentication();

  //HOOK: useState
  const [username, setUsername] = useState<string>("");

  //HOOK: useUsernameAvailability - check username, return a [warning,badge,btn]
  const availability = useUsernameAvailability(username);

  if (isAuth == "yes") {
    router.push("/profile/view");
  }

  if (isAuth == "no") {
    return (
      <>
        {/* GET STARTED */}
        <div id="get-started" className="z-10 flex-auto flex flex-col">
          {/* Hero */}
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

          {/* Scroll Snap */}
          <div className="scr mb-6">
            {/* Card 3 */}
            <div className="scr-item custom-bg-image-01"></div>
            <div className="scr-item custom-bg-image-01"></div>
            <div className="scr-item custom-bg-image-01"></div>
          </div>

          <form>
            <label className="input flex items-center mb-3">
              {/* {Check username availability in database, as user types} */}
              <img src="/wildpay-logo.svg" width={20} height={20} className="mr-2"></img>
              <div className="font-semibold tracking-wide">wildpay.eth / </div>

              <input
                id="username"
                name="username"
                type="text"
                className="grow tracking-wider ml-1"
                placeholder="yourname"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />

              {/* Display availability here */}
              <span className={`${availability[1]} badge`}>{availability[0]}</span>
            </label>

            {/* Button */}
            <button className={`btn btn-neutral text-base w-full ${availability[2]}`} formAction={claimLink}>
              Claim
            </button>
          </form>

          {/* Input */}
          {/* <input type="text" placeholder="Type here" className="input w-full" /> */}

          {/* Button */}
          {/* <Link href="/claimlink" className="btn btn-neutral text-base">
            {"Get started—it's free"}
          </Link> */}
        </div>
        {/* SOCIALS */}
        <div id="cust-socials" className="flex justify-center">
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
