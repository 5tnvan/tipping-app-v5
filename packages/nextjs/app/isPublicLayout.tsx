import { useContext, useState } from "react";
import React from "react";
import { useParams } from "next/navigation";
import { insertFollowing } from "./(profile)/[username]/actions";
import { AppContext, PublicContext } from "./context";
import { IsLoading } from "~~/components/app/IsLoading";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { IsNotAuthMenu } from "~~/components/app/authentication/IsNotAuthMenu";
import { FollowersModal } from "~~/components/app/modal/FollowersModal";
import { ArrowRightIcon } from "~~/components/assets/ArrowRightIcon";
import { SocialIcons } from "~~/components/assets/SocialIcons";
import TipsValueSum from "~~/components/subgraph/TipsValueSum";
import { useFollowers } from "~~/hooks/app/useFollowers";
import { usePublicProfile } from "~~/hooks/app/usePublicProfile";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const IsPublicLayout = ({ children }: { children: React.ReactNode }) => {
  const { username } = useParams();
  const { isLoadingAuth, isAuth, profile, refetchAuth } = useContext(AppContext);
  const { isLoading: isLoadingPublic, publicProfile, refetch: refetchPublic } = usePublicProfile(username);
  const { isLoading: isLoadingFollowers, followersData, refetch: refetchFollowers } = useFollowers(publicProfile?.id);

  const handleFollow = () => {
    //handle follow
    if (!followersData?.follow) {
      insertFollowing(publicProfile.id);
      refetchFollowers();
    }
  };

  //PAY MODAL
  const [isFollowersModalOpen, setFollowersModalOpen] = useState(false);

  const openFollowersModal = () => {
    setFollowersModalOpen(true);
  };

  const closeFollowersModal = () => {
    setFollowersModalOpen(false);
  };

  if (!isLoadingPublic && !publicProfile?.id) {
    return <div className="mt-20 text-black z-50 relative">User not found</div>;
  }

  let soc;
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

          <div id="wildpay-is-auth-top" className="profile mt-10 relative z-10">
            {/* ISPUBLIC PROFILE INTRO */}
            <div id="wildpay-is-auth-user-intro" className="intro flex justify-between text-black mb-4">
              <div className="flex">
                {/* ISAUTH PROFILE INTRO - AVATAR */}
                <div className="left mr-5 flex flex-col items-center">
                  {isLoadingAuth ? (
                    <div className="w-16 h-16 animate-pulse bg-slate-300 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"></div>
                  ) : (
                    <>
                      {!followersData?.followed && (
                        <>
                          <Avatar profile={publicProfile} width={16} />
                          <button
                            id="wildpay-avatar-cta"
                            className="absolute top-12 flex justify-center items-center pl-2 pr-2 rounded-full bg-white z-10 text-sm"
                            onClick={() => handleFollow()}
                          >
                            Follow
                            <ArrowRightIcon />
                          </button>
                        </>
                      )}
                      {followersData?.followed && (
                        <>
                          <Avatar profile={publicProfile} width={16} />
                          <button
                            id="wildpay-avatar-cta"
                            className="absolute top-12 flex justify-center items-center pl-2 pr-2 rounded-full bg-white z-10 text-sm"
                            onClick={() => openFollowersModal()}
                          >
                            Followed
                            <ArrowRightIcon />
                          </button>
                        </>
                      )}
                    </>
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
          <PublicContext.Provider value={{ isLoadingPublic, publicProfile, refetchPublic }}>
            {/* ISAUTH PAY MODAL */}
            <FollowersModal isOpen={isFollowersModalOpen} onClose={closeFollowersModal}></FollowersModal>

            {children}
          </PublicContext.Provider>
        </div>
      </>
    );
  }
};

export default IsPublicLayout;
