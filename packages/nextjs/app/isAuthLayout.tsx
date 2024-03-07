import { useContext } from "react";
import Link from "next/link";
import { AppContext } from "./context";
import { IsLoading } from "~~/components/app/IsLoading";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { IsAuthMenu } from "~~/components/app/authentication/IsAuthMenu";
import { SocialIcons } from "~~/components/assets/SocialIcons";
import TipsValueSum from "~~/components/subgraph/TipsValueSum";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const IsAuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuth, user, profile, refetch } = useContext(AppContext);

  const soc = {
    yt: { val: profile.youtube, link: "https://youtube.com/" + profile.youtube },
    ig: { val: profile.instagram, link: "https://instagram.com/" + profile.instagram },
    tw: { val: profile.twitter, link: "https://x.com/" + profile.twitter },
    tt: { val: profile.tiktok, link: "https://twitter.com/" + profile.tiktok },
  };

  return (
    <>
      <div id="wildpay-is-auth" className="bg-white grow pr-7 pl-7">
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

        <div className="custom-bg-auth absolute z-0 rounded-t-2xl"></div>
        <div id="wildpay-is-auth-top" className="profile mt-20 relative z-10">
          {/* USER INTRO */}
          <div id="wildpay-is-auth-user-intro" className="intro flex justify-between text-black mb-4">
            <div className="flex">
              <div className="left avatar mr-5">
                {isLoading ? (
                  <div className="w-16 animate-pulse bg-slate-300 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"></div>
                ) : (
                  profile.avatar_url && <Avatar src={profile.avatar_url} width={500} height={500} />
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
                    <div className="font-semibold">@{profile.username}</div>
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
                    <TipsValueSum receiverAddress={profile.wallet_id} />
                  </span>
                  <span className="text-xl"> Ξ</span>
                </>
              )}
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default IsAuthLayout;
