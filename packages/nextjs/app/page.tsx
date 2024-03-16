"use client";

import { useContext } from "react";
import Link from "next/link";
import { AppContext } from "./context";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { isAuth } = useContext(AppContext);

  if (isAuth == "yes") {
    return (
      <>
        {/* CONTENT */}
        <div id="sign-up-success" className="z-10 pt-28">
          {/* Hero: */}
          <div className="font-semibold custom-text-blue text-3xl ">{"Welcome to Wildpay 🎉."}</div>
          <div className=" custom-text-blue text-3xl mb-5">{"You are on the app."}</div>

          <Link href="/login" className="btn text-base mb-3 w-full">
            {"Go home"}
          </Link>
        </div>
      </>
    );
  }
  if (isAuth == "no") {
    return (
      <>
        <div className="z-10 flex flex-col grow justify-center text-3xl text-black">WildPay Landing Page</div>
      </>
    );
  }
};

export default Home;
