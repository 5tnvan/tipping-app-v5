"use client";

import { useContext } from "react";
import Link from "next/link";
import { NextPage } from "next";
import { AccountingContext, AppContext } from "~~/app/context";
import Transactions from "~~/components/app/accounting/Transactions";
import { CopyIcon } from "~~/components/assets/CopyIcon";
import "~~/styles/app-profile.css";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const ProfileView: NextPage = () => {
  const { isAuth, profile } = useContext(AppContext);
  const { incomingTx } = useContext(AccountingContext);

  console.log("profileView");

  if (isAuth == "no") {
    return (
      <div id="wildpay-is-not-auth" className="z-10 pt-28">
        <div className="font-semibold text-3xl mb-5">{"You are not logged in."}</div>
        <Link href="/login" className="btn text-base mb-3 w-full">
          {"Go to login"}
        </Link>
      </div>
    );
  }

  if (isAuth == "yes") {
    return (
      <>
        {/* CTA */}
        <div id="wildpay-cta" className="ml-6 mr-6 z-10 relative">
          <Link href="/profile/edit">
            <button className="btn-primary btn w-full text-base">Edit Profile</button>
          </Link>
        </div>
        <div id="profile-view-content" className="flex flex-col profile z-10 items-center">
          {/* Scroll Snap */}
          <div className="w-full pl-6 pr-6 pb-3 pt-3 flex justify-center">
            <div className="scr">
              {/* Card 3 */}
              <div className="scr-item custom-bg-image-01 flex items-center relative">
                <div className=" text-6xl font-black custom-difference-blend">{profile.username}</div>
                <div className="absolute btn btn-secondary url h-10 min-h-10">
                  <div className="mr-2">wildpay.eth/{profile.username}</div>
                  <CopyIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Payments Table */}
          <div className="latest w-full rounded-t-2xl bg-slate-100 pt-6 drop-shadow-sm">
            <div className="font-semibold pb-2 pr-6 pl-6">Received: </div>
            <div className="wildui-transaction-scroll-profile-view overflow-auto pr-6 pl-6 ">
              <Transactions tx={incomingTx} hide="to" />
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default ProfileView;
