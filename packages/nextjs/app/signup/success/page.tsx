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
        <div className="font-semibold text-3xl">{"Done 🎉"}</div>
        <div className="text-3xl">{"you're ready to go"}</div>

        {/* Steps */}
        <ul className="steps steps-vertical lg:steps-vertical">
          <li className="step step-primary">Claim handle</li>
          <li className="step step-primary">Sign Up</li>
          <li className="step step-primary">Ready to go</li>
        </ul>
        <Link href="/profile/view" className="btn btn-neutral">
          {"Complete your profile"}
        </Link>
        <Link href="/getstarted" className="btn">
          {"Connect your wallet"}
        </Link>
      
      </div>
    </>
  );
};

export default GetStartedSuccess;
