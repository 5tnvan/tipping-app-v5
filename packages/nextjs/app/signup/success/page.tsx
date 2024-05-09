"use client";

import { useContext } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { AuthContext } from "~~/app/context";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const GetStartedSuccess: NextPage = () => {
  const { isAuth } = useContext(AuthContext);

  if (isAuth == "no") {
    return (
      <>
        <div className="flex flex-col justify-center items-center h-full font-medium">
          <p>Sorry, something went wrong. Please try again later.</p>
          <Link href="/login" className="btn btn-secondary w-full mt-2">Go to Login</Link>
        </div>
      </>
    );
  }

  if (isAuth == "yes") {
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
