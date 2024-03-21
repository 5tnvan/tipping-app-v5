import { useContext, useEffect, useState } from "react";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { insertFollowing } from "./(profile)/[username]/actions";
import { AppContext, FollowersContext, ProfilePayContext, PublicAccountingContext, PublicContext } from "./context";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { IsLoading } from "~~/components/app/IsLoading";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { IsNotAuthMenu } from "~~/components/app/authentication/IsNotAuthMenu";
import { FollowersModal } from "~~/components/app/modal/FollowersModal";
import { ArrowRightIcon } from "~~/components/assets/ArrowRightIcon";
import { EthIcon } from "~~/components/assets/EthIcon";
import { SocialIcons } from "~~/components/assets/SocialIcons";
import { useAccounting } from "~~/hooks/app/useAccounting";
import { usePublicFollowers } from "~~/hooks/app/useFollowers";
import { usePublicProfile } from "~~/hooks/app/usePublicProfile";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { convertEthToUsd } from "~~/utils/app/functions/convertEthToUsd";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const IsPublicLayout = ({ children, onSuccess }: { children: React.ReactNode; onSuccess: () => void }) => {
  const router = useRouter();
  const { username } = useParams();
  const nativeCurrencyPrice = useNativeCurrencyPrice();

  const { isLoadingAuth, isAuth } = useContext(AppContext);
  const { refetchFollowers } = useContext(FollowersContext);
  const { isLoading: isLoadingPublic, publicProfile, refetch: refetchPublic } = usePublicProfile(username);
  const { incomingTx, incomingTxSum, refetch: refetchPublicAccounting } = useAccounting(publicProfile?.wallet_id);
  const {
    isLoading: isLoadingPublicFollowers,
    followersData: followersPublicData,
    refetch: refetchPublicFollowers,
  } = usePublicFollowers(username);
  const { profilePaySuccess } = useContext(ProfilePayContext);

  //LISTEN TO: profilePaySuccess from profile/username
  useEffect(() => {
    if (profilePaySuccess) {
      onSuccess(); //trigger isAuthLayout
      refetchPublicAccounting(); // refresh public accounting top and table
      console.log("isPublicLayout profilePaySuccess: refetchPublicAccounting()");
      router.refresh();
    }
  }, [profilePaySuccess]);

  //HANDLE FOLLOW
  const handleFollow = () => {
    if (isAuth == "yes" && !followersPublicData?.followed) {
      insertFollowing(publicProfile.id);
      refetchPublicFollowers();
      refetchFollowers();
    } else if (isAuth == "no") {
      router.push("/login");
    }
  };

  //FOLLOWERS MODAL
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
        <div className={`bg-white grow`}>
          {isAuth == "no" && <IsNotAuthMenu />}

          {/* ISPUBLIC CUSTOM-BG */}
          {isAuth == "no" && <div className="custom-top-cover absolute z-0"></div>}

          {/* ISPUBLIC AUTH TOP */}
          <div id="wildpay-top" className="profile mt-10 ml-6 mr-6 relative z-10">
            {/* ISPUBLIC PROFILE INTRO */}
            <div id="wildpay-user-intro" className="intro flex justify-between text-black mb-4">
              <div className="flex">
                {/* ISAUTH PROFILE INTRO - AVATAR */}
                <div className="left mr-5 flex flex-col items-center">
                  {isLoadingAuth || isLoadingPublic || isLoadingPublicFollowers ? (
                    <div className="w-16 h-16 animate-pulse rounded-full bg-slate-200"></div>
                  ) : (
                    <>
                      <Avatar profile={publicProfile} width={16} ring={false} />
                      {!isLoadingPublicFollowers && !followersPublicData?.followed && (
                        <div
                          id="wildpay-avatar-cta"
                          className="btn text-xs h-6 min-h-6 pl-2 pr-2 bg-white text-black z-10 w-max gap-0 absolute top-12"
                          onClick={() => handleFollow()}
                        >
                          Follow
                          <ArrowRightIcon />
                        </div>
                      )}
                      {!isLoadingPublicFollowers && followersPublicData?.followed && (
                        <div
                          id="wildpay-avatar-cta"
                          className="btn text-xs h-6 min-h-6 pl-2 pr-2 bg-white text-black z-10 w-max gap-0 absolute top-12"
                          onClick={() => openFollowersModal()}
                        >
                          <span>Followed</span>
                          <ChevronRightIcon width={8} />
                        </div>
                      )}
                    </>
                  )}
                </div>
                {/* ISAUTH PROFILE INTRO - HANDLE&SOCIAL */}
                <div className="right info flex justify-center flex-col">
                  {isLoadingAuth || isLoadingPublic ? (
                    <>
                      <span className="mb-1">
                        <IsLoading shape="rounded-md" width={28} height={6} />
                      </span>
                      <span>
                        <IsLoading shape="rounded-md" width={28} height={8} />
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="flex">
                        <div className="font-semibold mr-1">@{publicProfile.username}</div>
                      </div>
                      <SocialIcons soc={soc} />
                    </>
                  )}
                </div>
              </div>
              {/* ISAUTH PROFILE INTRO - ETH BALANCE */}
              <div className="text-4xl text-black flex justify-center items-center gap-2">
                {isLoadingAuth || isLoadingPublic ? (
                  <IsLoading shape="rounded-md" width={12} height={8} />
                ) : (
                  <>
                    <div className="flex flex-col items-end">
                      <div className="text-xl font-semibold custom-text-blue">
                        ${convertEthToUsd(incomingTxSum, nativeCurrencyPrice)}
                      </div>
                      <div className="text-xl flex items-center">
                        <EthIcon width={16} height={16} />
                        {incomingTxSum}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* ISPUBLIC CHILDREN */}
          <PublicContext.Provider value={{ isLoadingPublic, publicProfile, refetchPublic }}>
            <PublicAccountingContext.Provider value={{ incomingTx, refetchPublicAccounting }}>
              {/* ISAUTH FOLLOWERS MODAL */}
              <FollowersModal
                isOpen={isFollowersModalOpen}
                onClose={closeFollowersModal}
                data={followersPublicData}
                refetch={refetchPublicFollowers}
              ></FollowersModal>

              {children}
            </PublicAccountingContext.Provider>
          </PublicContext.Provider>
        </div>
      </>
    );
  }
};

export default IsPublicLayout;
