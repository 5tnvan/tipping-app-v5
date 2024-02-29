"use client";

import { useCallback, useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { getUser } from "../profile/actions";
import { claimLink } from "./actions";
import type { NextPage } from "next";
import { useUsernameAvailability } from "~~/hooks/supabase";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const ClaimLink: NextPage = () => {
  //HOOK: useState
  const [username, setUsername] = useState<string>("");

  //HOOK: useUsernameAvailability - check username, return a [warning,badge,btn]
  const availability = useUsernameAvailability(username);

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
          {/* Hero: */}
          <div className="font-semibold text-3xl">{"Let's get started"}</div>
          <div className="text-3xl">claim your handle</div>

          {/* Steps */}
          <ul className="steps steps-vertical lg:steps-vertical">
            <li className="step step-primary">Claim handle</li>
            <li className="step ">Sign Up</li>
            <li className="step ">Ready to go</li>
          </ul>

          {/* Input */}
          <form>
            <div className="font-semibold">{"What's your username?"}</div>
            <label className="input input-bordered flex items-center gap-2">
              {/* {Check username availability in database, as user types} */}
              <input
                id="username"
                name="username"
                type="text"
                className="grow"
                placeholder="Search"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              {/* Display availability here */}
              <span className={`${availability[1]} badge`}>{availability[0]}</span>
            </label>

            {/* Button */}

            <button className={`btn btn-neutral w-full ${availability[2]}`} formAction={claimLink}>
              Claim
            </button>
          </form>
        </div>
      </>
    );
  }
};

export default ClaimLink;
