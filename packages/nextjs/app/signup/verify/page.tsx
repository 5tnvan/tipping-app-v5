"use client";

import type { NextPage } from "next";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const SignUpVerify: NextPage = () => {
  return (
    <>
      {/* CONTENT */}
      <div id="sign-up-success" className="z-10 pt-28">
        {/* Hero: */}
        <div className="font-semibold custom-text-blue text-3xl ">{"Almost there 🎉."}</div>
        <div className=" custom-text-blue text-3xl mb-5">{"Confirm your email."}</div>

        <button className="btn text-base mb-3 w-full">
        <span className="loading loading-ring loading-xs"></span>
          {"Waiting"}
        </button>
      </div>
    </>
  );
};

export default SignUpVerify;
