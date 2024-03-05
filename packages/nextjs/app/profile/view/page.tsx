"use client";

import { useRouter } from "next/navigation";
import { NextPage } from "next";
import { CopyIcon } from "~~/components/assets/CopyIcon";
import TipsTable from "~~/components/subgraph/TipsTable";
import { useAuthentication } from "~~/hooks/app/useAuthentication";
import "~~/styles/app-profile.css";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

const ProfileView: NextPage = () => {
  const router = useRouter();
  const { isAuth, profile } = useAuthentication();

  /* ROUTE */
  if (isAuth == "no") {
    router.push("/login");
  }

  if (isAuth == "yes") {
    return (
      <>
        <div id="profile-view-content" className="profile mt-5 mb-5 z-10">
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
          <TipsTable receiverAddress={profile.wallet_id} />
        </div>
      </>
    );
  }
};
export default ProfileView;
