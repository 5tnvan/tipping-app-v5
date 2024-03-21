"use client";

import { useContext } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { AppContext } from "~~/app/context";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const SignUpVerify: NextPage = () => {
  const { isAuth } = useContext(AppContext);

  if (isAuth == "yes") {
    return (
      <>
        <div className="z-10 pt-28 pl-6 pr-6">
          <div className="font-medium custom-text-blue text-3xl ">{"You are already logged in."}</div>
          <Link href="/home" className="btn btn-primary mt-3 text-base w-full">
            {"Go Home"}
          </Link>
        </div>
      </>
    );
  }
  if (isAuth == "no") {
    return (
      <>
        {/* CONTENT */}
        <div className="z-10 pt-28">
          {/* Hero: */}
          <div className="font-semibold custom-text-blue text-3xl ">{"Almost there 🎉."}</div>
          <div className=" custom-text-blue text-3xl mb-5">{"Confirm your email."}</div>

          <button className="btn btn-neutral text-base mb-3 w-full">
            <span className="loading loading-ring loading-xs"></span>
            {"Waiting"}
          </button>
        </div>
      </>
    );
  }
};

export default SignUpVerify;
