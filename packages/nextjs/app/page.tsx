"use client";

import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "./context";
import type { NextPage } from "next";
import { WildPayLogo } from "~~/components/app/WildpayLogo";
import { Meteors } from "~~/components/app/ui/meteors";
import { Tabs } from "~~/components/app/ui/tabs";
import { WavyBackground } from "~~/components/app/ui/wavyBackground";
import { TelegramIcon } from "~~/components/assets/TelegramIcon";
import { TwitterIcon } from "~~/components/assets/TwitterIcon";
import { YoutubeIcon } from "~~/components/assets/YoutubeIcon";

/*
 * LANDING PAGE
 * Index page for all users
 */

const Home: NextPage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const launchAppLink = isAuthenticated === "yes" ? "/home" : isAuthenticated === "no" ? "/getstarted" : "/login";

  const tabs = [
    {
      title: "Social",
      value: "Social",
      content: (
        <div className="w-full h-fit sm:h-full overflow-hidden rounded-2xl p-10 relative bg-accent bg-gradient-to-r from-cyan-600 via-lime-500 ">
          <div className="flex flex-col sm:flex-row">
            <Image
              src="/profile-mock-xl-min.png"
              alt="dummy image"
              priority={true}
              width="1000"
              height="1000"
              className="object-cover object-left-top w-[40%] -bottom-10 inset-x-0 rounded-xl"
            />
            <div className="mt-10 sm:mt-20 sm:ml-10 h-fit">
              <div className="font-semibold text-primary text-3xl mb-1">Share your profile</div>
              <div className="text-secondary font-light text-md mb-2">Receive money from</div>
              <div className="text-secondary font-semibold flex items-center mb-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary checkbox-xs mr-1 font-semibold"
                />
                Family
              </div>
              <div className="text-secondary font-semibold flex items-center mb-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary checkbox-xs mr-1 font-semibold"
                />
                Friends
              </div>
              <div className="text-secondary font-semibold flex items-center mb-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary checkbox-xs mr-1 font-semibold"
                />
                Followers
              </div>
              <Link href="/getstarted" className="btn bg-gradient-to-r from-cyan-600 via-lime-500 mt-2 w-full border-0">
                Claim a handle
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Payment",
      value: "Payment",
      content: (
        <div className="w-full h-fit sm:h-full overflow-hidden rounded-2xl p-10 relative bg-accent bg-gradient-to-r from-cyan-600 via-lime-500 ">
          <div className="flex flex-col sm:flex-row">
            <Image
              src="/pay-mock-xl.png"
              alt="dummy image"
              width="1000"
              height="1000"
              className="object-cover object-left-top w-[40%] -bottom-10 inset-x-0 rounded-xl"
            />
            <div className="mt-10 sm:mt-20 sm:ml-10 h-fit">
              <div className="font-semibold text-primary text-3xl mb-1">Pay or get paid</div>
              <div className="text-secondary font-light text-md mb-2">Transact and withdraw</div>
              <div className="text-secondary font-semibold flex items-center mb-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary checkbox-xs mr-1 font-semibold"
                />
                Instantly
              </div>
              <div className="text-secondary font-semibold flex items-center mb-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary checkbox-xs mr-1 font-semibold"
                />
                Borderless
              </div>
              <div className="text-secondary font-semibold flex items-center mb-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary checkbox-xs mr-1 font-semibold"
                />
                Fees borne by payer
              </div>
              <Link href="/getstarted" className="btn bg-gradient-to-r from-cyan-600 via-lime-500 mt-2 w-full border-0">
                Pay Now
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Proof",
      value: "Proof",
      content: (
        <div className="w-full h-fit sm:h-full overflow-hidden rounded-2xl p-10 relative bg-accent bg-gradient-to-r from-cyan-600 via-lime-500 ">
          <div className="flex flex-col sm:flex-row">
            <Image
              src="/invoice-mock-xl-min.png"
              alt="dummy image"
              width="1000"
              height="1000"
              className="object-cover object-left-top w-[40%] -bottom-10 inset-x-0 rounded-xl"
            />
            <div className="mt-10 sm:mt-20 sm:ml-10 h-fit">
              <div className="font-semibold text-primary text-3xl mb-1">Show your proof</div>
              <div className="text-secondary font-light text-md mb-2">Track your gains</div>
              <div className="text-secondary font-semibold flex items-center mb-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary checkbox-xs mr-1 font-semibold"
                />
                Beautiful receipts
              </div>
              <div className="text-secondary font-semibold flex items-center mb-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary checkbox-xs mr-1 font-semibold"
                />
                Forever on blockchains
              </div>
              <div className="text-secondary font-semibold flex items-center mb-1">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary checkbox-xs mr-1 font-semibold"
                />
                History counter
              </div>
              <Link href="/getstarted" className="btn bg-gradient-to-r from-cyan-600 via-lime-500 mt-2 w-full border-0">
                See proofs
              </Link>
            </div>
          </div>
        </div>
      ),
    },
  ];

  if (isAuthenticated == "no" || isAuthenticated == "yes") {
    return (
      <>
        <WavyBackground className="w-screen h-full flex flex-col pr-10 pl-10">
          {/* Navigation */}
          {/* Navigation */}
          <div className="flex justify-between items-start mt-10">
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
          <div className="flex flex-col pt-36 pb-36 items-center justify-center grow">
            <h1 className="text-4xl md:text-4xl lg:text-6xl text-white font-bold text-center">Dare to get paid?</h1>
            <h2 className="text-base mt-4 text-white font-normal text-center mb-4">
              Get paid 24/7, from anywhere in the world.
            </h2>
            <Link href={launchAppLink} className="btn btn-primary">
              Launch dApp
            </Link>
          </div>
        </WavyBackground>

        {/* Tabs */}
        <div className="h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full items-start justify-start mt-10 mb-40">
          <Tabs tabs={tabs} />
        </div>

        {/* Whats next */}
        <div className="flex flex-col items-center">
          <div className="text-3xl mb-10 text-white">{`What's next?`}</div>
          <div className="flex flex-col flex-wrap md:flex-row justify-center">
            <div className="mb-5 mr-5">
              <div className=" w-full relative max-w-xs">
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
                <div className="relative shadow-xl bg-neutral-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-2 w-2 text-gray-300"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                    </svg>
                  </div>

                  <h1 className="font-bold text-xl text-white mb-4 relative z-50">Base</h1>

                  <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                    Base is a secure, low-cost, Ethereum L2, a perfect network for transacting onchain.
                  </p>

                  <div className="border px-4 py-1 rounded-lg border-gray-500 text-gray-300">Multi-chain</div>
                  <Meteors number={20} />
                </div>
              </div>
            </div>
            <div className="mb-5 mr-5">
              <div className=" w-full relative max-w-xs">
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
                <div className="relative shadow-xl bg-neutral-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-2 w-2 text-gray-300"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                    </svg>
                  </div>

                  <h1 className="font-bold text-xl text-white mb-4 relative z-50">USDC & USDT</h1>

                  <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                    Stablecoins, engineered for stability, serve as ideal mediums for transferring value.
                  </p>

                  <div className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">Multi-currency</div>
                </div>
              </div>
            </div>
            <div className="mb-5 mr-5">
              <div className=" w-full relative max-w-xs">
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
                <div className="relative shadow-xl bg-neutral-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-2 w-2 text-gray-300"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                    </svg>
                  </div>

                  <h1 className="font-bold text-xl text-white mb-4 relative z-50">Auto-yield Generation</h1>

                  <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                    Earn rewards and passive income on your assets, all automatically and hassle-free.
                  </p>

                  <div className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">Passive income</div>
                </div>
              </div>
            </div>
            <div className="mb-5 mr-5">
              <div className=" w-full relative max-w-xs">
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
                <div className="relative shadow-xl bg-neutral-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-2 w-2 text-gray-300"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                    </svg>
                  </div>

                  <h1 className="font-bold text-xl text-white mb-4 relative z-50">Native Apps</h1>

                  <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                    Mobile app experiences, convinient at your fingertips, available for download on Apple Store and
                    Google Play.
                  </p>

                  <div className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">Native Apps</div>
                </div>
              </div>
            </div>
            <div className="mb-5 mr-5">
              <div className=" w-full relative max-w-xs">
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
                <div className="relative shadow-xl bg-neutral-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-2 w-2 text-gray-300"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                    </svg>
                  </div>

                  <h1 className="font-bold text-xl text-white mb-4 relative z-50">Wild NFTs</h1>

                  <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                    Give your old Web2 identity a makeover with a single click of button, powered by AI.
                  </p>

                  <div className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">Web3 Identity</div>
                </div>
              </div>
            </div>
            <div className="mb-5 mr-5">
              <div className=" w-full relative max-w-xs">
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
                <div className="relative shadow-xl bg-neutral-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-2 w-2 text-gray-300"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                    </svg>
                  </div>

                  <h1 className="font-bold text-xl text-white mb-4 relative z-50">Wild Superchat</h1>

                  <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                    We are bringing back 90s chatrooms, offering a 24/7 superchat for real-time community conversations.
                  </p>

                  <div className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">Web3 Community</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center"></div>
        </div>
        <footer className="footer items-center p-4 bg-primary mt-20 text-white">
          <aside className="items-center grid-flow-col">
            <WildPayLogo width="36" height="36" color="white" />
            <p>
              Copyright ©{" "}
              <Link href="https://micalabs.org/" className="link">
                MicaLabs
              </Link>{" "}
              2024 - All right reserved
            </p>
          </aside>
          <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
            <Link href="https://x.com/wildpay">
              <TwitterIcon width={18} height={18} />
            </Link>
            <Link href="https://t.me/wildpayapp">
              <TelegramIcon width={18} height={18} />
            </Link>
            <Link href="https://www.youtube.com/@wildpay">
              <YoutubeIcon width={18} height={18} />
            </Link>
          </nav>
        </footer>
      </>
    );
  }
};

export default Home;
