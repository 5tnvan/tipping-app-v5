"use client";

import Link from "next/link";
import type { NextPage } from "next";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";
import { IsAuthMenu } from "~~/components/app/authentication/isAuthMenu";

const SignUpVerify: NextPage = () => {
  return (
    <><IsAuthMenu />
      {/* CONTENT */}
      <div id="sign-up-success" className="z-10">
        {/* Hero: */}
        <div className="font-semibold custom-text-blue text-3xl ">{"Almost there 🎉."}</div>
        <div className=" custom-text-blue text-3xl mb-5">{"Confirm your email."}</div>

        <Link href="/login" className="btn text-base mb-3 w-full">
          {"Go to login"}
        </Link>
      </div>
    </>
  );
};

export default SignUpVerify;
