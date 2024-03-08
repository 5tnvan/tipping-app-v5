import { useContext } from "react";
import React from "react";
import { useParams } from "next/navigation";
import { AppContext, PublicContext } from "./context";
import { IsLoading } from "~~/components/app/IsLoading";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { IsAuthMenu } from "~~/components/app/authentication/IsAuthMenu";
import { IsNotAuthMenu } from "~~/components/app/authentication/IsNotAuthMenu";
import { SocialIcons } from "~~/components/assets/SocialIcons";
import TipsValueSum from "~~/components/subgraph/TipsValueSum";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const IsPublicLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoadingAuth, isAuth, profile, refetchAuth } = useContext(AppContext);
  const { isLoadingPublic, publicProfile, refetchPublic } = useContext(PublicContext);

  console.log("isauth? " + isAuth);

  let soc;

  if (!isLoadingPublic && !publicProfile?.id) {
    console.log("user not found");
    return <div className="mt-20 text-black z-50 relative">User not found</div>;
  }

  if (publicProfile?.id) {
    soc = {
      yt: { val: publicProfile.youtube, link: "https://youtube.com/" + publicProfile.youtube },
      ig: { val: publicProfile.instagram, link: "https://instagram.com/" + publicProfile.instagram },
      tw: { val: publicProfile.twitter, link: "https://x.com/" + publicProfile.twitter },
      tt: { val: publicProfile.tiktok, link: "https://twitter.com/" + publicProfile.tiktok },
    };
  }

  if (publicProfile?.id) {
    return (
      <>
        <div id="wildpay-public" className={`bg-white h-full grow ${isAuth == "yes" ? "" : "pr-7 pl-7"}`}>
          {isAuth == "no" && <IsNotAuthMenu />}

          {/* ISPUBLIC CUSTOM-BG */}
          {isAuth == "no" && <div className="custom-bg-auth absolute z-0 rounded-t-2xl"></div>}

          <div id="wildpay-is-auth-top" className="profile mt-20 relative z-10">
            {/* ISPUBLIC PROFILE INTRO */}
            <div id="wildpay-is-auth-user-intro" className="intro flex justify-between text-black mb-4">
              <div className="flex">
                {/* ISAUTH PROFILE INTRO - AVATAR */}
                <div className="left mr-5">
                  {isLoadingAuth ? (
                    <div className="w-16 animate-pulse bg-slate-300 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"></div>
                  ) : (
                    <Avatar profile={publicProfile} width={16} />
                  )}
                </div>
                {/* ISAUTH PROFILE INTRO - HANDLE&SOCIAL */}
                <div className="right info flex justify-center flex-col">
                  {isLoadingAuth ? (
                    <>
                      <IsLoading shape="rounded-md" width={28} height={6} />
                      <IsLoading shape="rounded-md" width={28} height={8} />
                    </>
                  ) : (
                    <>
                      <div className="font-semibold">@{publicProfile.username}</div>
                      <SocialIcons soc={soc} />
                    </>
                  )}
                </div>
              </div>
              {/* ISAUTH PROFILE INTRO - ETH BALANCE */}
              <div className="text-4xl flex justify-center items-center gap-2">
                {isLoadingAuth ? (
                  <IsLoading shape="rounded-md" width={28} height={8} />
                ) : (
                  <>
                    <span>
                      <TipsValueSum receiverAddress={publicProfile.wallet_id} />
                    </span>
                    <span className="text-xl"> Ξ</span>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* ISPUBLIC CHILDREN */}
          {children}
        </div>
      </>
    );
  }
};

export default IsPublicLayout;
