"use client";

import { useContext } from "react";
import Link from "next/link";
import { AppContext } from "./context";
import type { NextPage } from "next";
import { WildPayLogo } from "~~/components/app/WildpayLogo";
import { WavyBackground } from "~~/components/app/ui/wavyBackground";

const Home: NextPage = () => {
  const { isAuth } = useContext(AppContext);
  const launchAppLink = isAuth === "yes" ? "/home" : isAuth === "no" ? "/getstarted" : "/login";

  // if (isAuth == "yes") {
  //   return (
  //     <>
  //       {/* CONTENT */}
  //       <div id="sign-up-success" className="z-10 pt-28">
  //         {/* Hero: */}
  //         <div className="font-semibold custom-text-blue text-3xl ">{"Welcome to Wildpay 🎉."}</div>
  //         <div className=" custom-text-blue text-3xl mb-5">{"You are on the app."}</div>

  //         <Link href="/login" className="btn text-base mb-3 w-full">
  //           {"Go home"}
  //         </Link>
  //       </div>
  //     </>
  //   );
  // }
  if (isAuth == "no" || isAuth == "yes") {
    return (
      <>
        <WavyBackground className="w-screen h-full flex flex-col pb-40 pr-10 pl-10">
          {/* Navigation */}
          <div className="flex justify-between items-start pt-10">
            <div className="flex items-center">
              <WildPayLogo color="white" width="30" height="30" />
              <span className="ml-2 text-lg font-semibold text-white">wildpay</span>
            </div>
            <Link
              href={launchAppLink}
              className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                Launch dApp
              </span>
            </Link>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center justify-center grow">
            <h1 className="text-4xl md:text-4xl lg:text-6xl text-white font-bold text-center">Dare to get paid?</h1>
            <h2 className="text-base mt-4 text-white font-normal text-center mb-4">
              Get paid 24/7, from anywhere in the world.
            </h2>
            <Link
              href={launchAppLink}
              className="shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 bg-[#fff] text-[#696969] rounded-md font-light transition duration-200 ease-linear"
            >
              Launch dApp
            </Link>
          </div>
        </WavyBackground>
      </>
    );
  }
};

export default Home;
