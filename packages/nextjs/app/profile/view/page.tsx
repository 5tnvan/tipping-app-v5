"use client";

import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import { AppContext } from "~~/app/context";
import { CopyIcon } from "~~/components/assets/CopyIcon";
import TipsTable from "~~/components/subgraph/TipsTable";
import "~~/styles/app-profile.css";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const ProfileView: NextPage = () => {
  const router = useRouter();
  const { isLoadingAuth, isAuth, profile } = useContext(AppContext);

  /* ROUTE */
  if (isAuth == "no") {
    return (
      <>
        {/* CONTENT */}
        <div id="wildpay-is-not-auth" className="z-10 pt-28">
          <div className="font-semibold text-3xl mb-5">{"You are not logged in."}</div>
          <Link href="/login" className="btn text-base mb-3 w-full">
            {"Go to login"}
          </Link>
        </div>
      </>
    );
  }

  if (isAuth == "yes") {
    return (
      <>
        {/* CTA */}
        <div id="wildpay-is-auth-cta" className="mb-5 z-10 relative">
          <Link href="/profile/edit">
            <button className="btn-neutral btn w-full text-base custom-bg-blue border-0">Edit Profile</button>
          </Link>
        </div>
        <div id="profile-view-content" className="flex flex-col profile mt-5 mb-5 z-10 items-center">
          {/* Scroll Snap */}
          <div className="scr mb-6">
            {/* Card 3 */}
            <div className="scr-item custom-bg-image-01 flex items-center relative">
              <div className=" text-6xl font-black custom-difference-blend">{profile.username}</div>
              <div className="absolute url flex custom-bg-blue pt-2 pb-2 pr-3 pl-3 text-white rounded-full text-sm items-center">
                <div className="mr-2">wildpay.eth/{profile.username}</div>
                <CopyIcon />
              </div>
            </div>
          </div>

          {/* Tips Table */}
          <div className="latest"></div>
          <div id="wildpay-profile-tx" className="latest w-full overflow-auto">
            <TipsTable receiverAddress={profile.wallet_id} keyProp={undefined} />
          </div>
        </div>
      </>
    );
  }
};
export default ProfileView;
