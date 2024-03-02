"use client";

import type { NextPage } from "next";
import Link from "next/link";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const GetStartedSuccess: NextPage = () => {
  return (
    <>
      {/* CONTENT */}
      <div className="cont z-10">
        {/* Hero: */}
        <div className="font-semibold custom-text-blue text-3xl ">{"Done 🎉."}</div>
        <div className=" custom-text-blue text-3xl mb-5">{"Ready to go."}</div>

        <Link href="/profile/view" className="btn btn-neutral mb-3 text-base w-full">
          {"Complete your profile"}
        </Link>
        <Link href="/getstarted" className="btn text-base mb-3 w-full">
          {"Connect your wallet"}
        </Link>
      
      </div>
    </>
  );
};

export default GetStartedSuccess;
