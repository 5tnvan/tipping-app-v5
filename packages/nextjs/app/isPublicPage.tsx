import { useContext, useState } from "react";
import React from "react";
import { AppContext, PublicContext } from "./context";
import { IsLoading } from "~~/components/app/IsLoading";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { SocialIcons } from "~~/components/assets/SocialIcons";
import TipsValueSum from "~~/components/subgraph/TipsValueSum";
import { fetchPublicProfile } from "~~/utils/app/fetchUser";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import { IsAuthMenu } from "~~/components/app/authentication/IsAuthMenu";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const IsPublicPage = ({ children, username }: { children: React.ReactNode; username: string }) => {
  const { isLoading, isAuth, profile, refetch } = useContext(AppContext);
  const [publicProfile, setPublicProfile] = useState({
    id: "init",
    updated_at: null,
    username: null,
    full_name: null,
    avatar_url: null,
    website: null,
    youtube: null,
    instagram: null,
    twitter: null,
    tiktok: null,
    wallet_id: null,
  });

  const soc = {
    yt: { val: publicProfile.youtube, link: "https://youtube.com/" + publicProfile.youtube },
    ig: { val: publicProfile.instagram, link: "https://instagram.com/" + publicProfile.instagram },
    tw: { val: publicProfile.twitter, link: "https://x.com/" + publicProfile.twitter },
    tt: { val: publicProfile.tiktok, link: "https://twitter.com/" + publicProfile.tiktok },
  };

  const initPublicProfile = async () => {
    const profile = await fetchPublicProfile(username);
    setPublicProfile(profile);
  };

  React.useEffect(() => {
    console.log("Effect: Load Profile");
    initPublicProfile();
  }, []);

  if (publicProfile.id == null) {
    return <div>This page doesnt exist</div>;
  }

  if (publicProfile.id != null && publicProfile.id != "init") {
    return (
      <>
        <div id="wildpay-public" className="bg-white h-full pr-7 pl-7">
          {/* USER MENU BAR */}

          {isLoading ? (
            <>
              <div className="z-10 custom-is-auth-menu absolute">
                <div tabIndex={0} role="button" className="btn m-1 btn-primary bg-slate-300 animate-pulse w-24"></div>
              </div>
            </>
          ) : (
            <IsAuthMenu profile={profile} refetch={refetch} />
          )}
          <div className="custom-auth-bg absolute z-0 rounded-t-2xl"></div>
          <div id="wildpay-is-auth-top" className="profile mt-20 relative z-10">
            {/* USER INTRO */}
            <div id="wildpay-is-auth-user-intro" className="intro flex justify-between text-black mb-4">
              <div className="flex">
                <div className="left avatar mr-5">
                  {isLoading ? (
                    <div className="w-16 animate-pulse bg-slate-300 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"></div>
                  ) : (
                    publicProfile.avatar_url && <Avatar src={publicProfile.avatar_url} width={500} height={500} />
                  )}
                </div>
                <div className="right info flex justify-center flex-col">
                  {isLoading ? (
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

              <div className="text-4xl flex justify-center items-center gap-2">
                {isLoading ? (
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
          <PublicContext.Provider value={{ publicProfile }}>{children}</PublicContext.Provider>
        </div>
      </>
    );
  }
};

export default IsPublicPage;
