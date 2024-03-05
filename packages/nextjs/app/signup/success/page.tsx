"use client";

import Link from "next/link";
import type { NextPage } from "next";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";
import { IsAuthMenu } from "~~/components/app/authentication/isAuthMenu";

const GetStartedSuccess: NextPage = () => {
  return (
    <><IsAuthMenu />
      {/* CONTENT */}
      <div id="sign-up-success" className="z-10">
        {/* Hero: */}
        <div className="font-semibold custom-text-blue text-3xl ">{"Done 🎉."}</div>
        <div className=" custom-text-blue text-3xl mb-5">{"Ready to go."}</div>

        {/* Scroll Snap */}
        {/* <div className="scr mb-6">
          <div className="scr-item custom-bg-image-01"></div>
        </div> */}

        <Link href="/profile/edit" className="btn btn-neutral mb-3 text-base w-full">
          {"Complete your profile"}
        </Link>
        <Link href="/settings" className="btn text-base mb-3 w-full">
          {"Connect your wallet"}
        </Link>
      </div>
    </>
  );
};

export default GetStartedSuccess;
