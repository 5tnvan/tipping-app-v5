"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AuthContext } from "../context";
import { setUsernameCookie } from "../signup/actions";
import type { NextPage } from "next";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { BaseIcon } from "~~/components/assets/BaseIcon";
import { CopyIcon } from "~~/components/assets/CopyIcon";
import { EthIcon } from "~~/components/assets/EthIcon";
import { isUsernameTaken } from "~~/hooks/supabase";
import { FuseIcon } from "~~/components/assets/FuseIcon";

const GetStarted: NextPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const [isProcessing, setIsProcessing] = useState<any>();
  const [username, setUsername] = useState<string>("");
  const [slash, setSlash] = useState<string>("");
  const [availability, setAvailability] = useState<[string, string, string, string]>([
    "",
    "",
    "btn-light",
    "Get started-it's free",
  ]);

  /* COPY BUTTON */
  const [copied1, setCopied1] = useState(false);

  const handleCopyToClipboard = (number: any) => {
    navigator.clipboard.writeText("https://www.wildpay.app/" + username);
    if (number == 1) {
      setCopied1(true);
      setTimeout(() => {
        setCopied1(false);
      }, 1500); // Reset the copied state after 2 seconds
    }
  };

  // perform a side effect as user types 'username'
  useEffect(() => {
    (async () => {
      let warningText = "";
      let badgeClass = "";
      let btnClass = "btn-neutral";
      let btnValue = "Get started-it's free";

      if (username.length === 0) {
        warningText = "";
        setSlash("");
      } else if (username.length < 3) {
        warningText = "Type more";
        badgeClass = "badge-warning";
        setSlash("/");
      } else {
        const taken = await isUsernameTaken(username.toLowerCase());
        warningText = taken ? "Taken" : "Available";
        badgeClass = taken ? "badge-error" : "badge-success";
        btnValue = taken ? "Claim" : "Claim";
        btnClass = taken ? "btn-neutral btn-disabled" : "btn-primary";
        setSlash("/");
      }

      setAvailability([warningText, badgeClass, btnClass, btnValue]);
    })();
  }, [username]);

  if (isAuthenticated == "no") {
    return (
      <>
        {/* GET STARTED */}
        <div id="wildpay-get-started" className="z-10 flex flex-col grow justify-center pr-6 pl-6 pb-16">
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
          <div className="container mb-4">
            <div className="gradient">
              <div className="scr">
                <div className="scr-item custom-bg-image-01 flex items-center relative overflow-hidden shadow-xl">
                  <div className="absolute network flex">
                    <div className="btn hover:bg-fuchsia-500 font-medium h-6 min-h-6 gap-0 bg-fuchsia-400 px-2 mr-1">
                      <EthIcon width={14} height={14} fill="#3C3C3C" />
                      ethereum
                    </div>
                    <div className="btn hover:bg-fuchsia-500 font-medium flex h-6 min-h-6 gap-0 bg-fuchsia-400 px-2">
                      <BaseIcon width={10} height={10} fill="#3C3C3C" />
                      <span className="pl-1">base</span>
                    </div>
                    <div className="btn hover:bg-fuchsia-500 font-medium flex h-6 min-h-6 gap-0 bg-fuchsia-400 px-2 ml-1">
                      <FuseIcon />
                    <span className="pl-1">fuse</span>
                  </div>
                  </div>
                  <div className=" text-6xl font-black custom-difference-blend">{username}</div>
                  <div
                    className="absolute btn btn-accent px-3 url h-8 min-h-8 bg-gradient-to-r from-cyan-600 via-lime-500 border-0"
                    onClick={() => handleCopyToClipboard(1)}
                  >
                    <div className="flex items-center">
                      {copied1 ? (
                        <>
                          <span className="mr-1">Copied</span>
                          <span className="text-secondary">
                            <CheckCircleIcon width={14} />
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="mr-1">
                            wildpay.app{slash}
                            {username}
                          </span>
                          <CopyIcon />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GET STARTED CLAIM USERNAME */}
          <form id="wildpay-claim">
            <label className="input flex items-center mb-3">
              <Image alt="wildpay" src="/wildpay-logo.svg" width={20} height={20} className="mr-2" />

              <div id="wildpay-claim-domain" className="font-semibold tracking-wide">
                wildpay.app /{" "}
              </div>
              {/* GET STARTED USERNAME INPUT */}
              <input
                id="username"
                name="username"
                type="text"
                className="grow tracking-wider ml-1 bg-white"
                placeholder="yourname"
                pattern="^[a-z][a-z0-9_]{2,15}$"
                title="Only lowercase letters, numbers, and underscores."
                maxLength={15}
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
              onClick={() => {
                if (username.trim().match(/^[a-z][a-z0-9_]{2,15}$/)) {
                  setIsProcessing(true);
                }
              }}
              formAction={setUsernameCookie}
              disabled={!username.trim()}
            >
              {availability[3]}
              {isProcessing && <span className="loading loading-ring loading-md"></span>}
            </button>
          </form>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default GetStarted;
