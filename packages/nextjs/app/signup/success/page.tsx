"use client";

import { useContext } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { AuthContext } from "~~/app/context";

const GetStartedSuccess: NextPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated == "yes") {
    return (
      <>
        {/* CONTENT */}
        <div className="z-10 pt-28 pl-6 pr-6">
          {/* Hero: */}
          <div className="font-semibold custom-text-blue text-3xl ">{"Done 🎉."}</div>
          <div className=" custom-text-blue text-3xl mb-5">{"Ready to go."}</div>

          <Link href="/profile/edit" className="btn btn-secondary mb-3 text-base w-full">
            {"Complete your profile"}
          </Link>
          <Link href="/settings" className="btn btn-primary text-base mb-3 w-full">
            {"Connect your wallet"}
          </Link>
        </div>
      </>
    );
  }
};

export default GetStartedSuccess;
