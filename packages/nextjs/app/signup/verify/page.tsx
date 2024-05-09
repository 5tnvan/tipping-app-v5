"use client";

import { useContext } from "react";
import type { NextPage } from "next";
import { AuthContext } from "~~/app/context";

const SignUpVerify: NextPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated == "no") {
    return (
      <>
        {/* CONTENT */}
        <div className="z-10 pt-28 pl-6 pr-6">
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
