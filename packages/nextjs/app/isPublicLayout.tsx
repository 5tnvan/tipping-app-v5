import { useContext, useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { insertFollowing } from "./(profile)/[username]/actions";
import { AppContext, FollowersContext, PublicContext } from "./context";
import { ChevronRightIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { IsLoading } from "~~/components/app/IsLoading";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { IsNotAuthMenu } from "~~/components/app/authentication/IsNotAuthMenu";
import { FollowersModal } from "~~/components/app/modal/FollowersModal";
import { ArrowRightIcon } from "~~/components/assets/ArrowRightIcon";
import { SocialIcons } from "~~/components/assets/SocialIcons";
import { usePublicFollowers } from "~~/hooks/app/useFollowers";
import { usePublicProfile } from "~~/hooks/app/usePublicProfile";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useIncomingTransactions } from "~~/utils/app/fetch/fetchIncomingTransactions";
import { useOutgoingTransactions } from "~~/utils/app/fetch/fetchOutgoingTransactions";
import { calculateSum } from "~~/utils/app/functions/calculateSum";
import { convertEthToUsd } from "~~/utils/app/functions/convertEthToUsd";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const IsPublicLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { username } = useParams();
  const nativeCurrencyPrice = useNativeCurrencyPrice();

  /* USER, PUBLIC USER, FOLLOWERS, PUBLIC FOLLOWERS */
  const { isLoadingAuth, isAuth } = useContext(AppContext);
  const { refetchFollowers } = useContext(FollowersContext);
  const { isLoading: isLoadingPublic, publicProfile, refetch: refetchPublic } = usePublicProfile(username);
  const {
    isLoading: isLoadingPublicFollowers,
    followersData: followersPublicData,
    refetch: refetchPublicFollowers,
  } = usePublicFollowers(username);

  /* TRANSACTIONS VARIABLES */
  const [incomingEthTxSum, setIncomingEthTxSum] = useState(0);
  const [incomingBaseTxSum, setIncomingBaseTxSum] = useState(0);

  /* FETCH TRANSACTIONS */
  const incomingRes = useIncomingTransactions(publicProfile?.wallet_id);
  const outgoingRes = useOutgoingTransactions(publicProfile?.wallet_id);

  useEffect(() => {
    setIncomingEthTxSum(calculateSum(incomingRes.ethereumData));
    setIncomingBaseTxSum(calculateSum(incomingRes.baseData));
  }, [incomingRes, outgoingRes]);

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

  let soc;
  if (publicProfile?.id) {
    soc = {
      le: { val: publicProfile.lens, link: "https://lens.xyz/" + publicProfile.lens },
      fc: { val: publicProfile.farcaster, link: "https://warpcast.com/" + publicProfile.farcaster },
      yt: { val: publicProfile.youtube, link: "https://youtube.com/" + publicProfile.youtube },
      ig: { val: publicProfile.instagram, link: "https://instagram.com/" + publicProfile.instagram },
      tw: { val: publicProfile.twitter, link: "https://x.com/" + publicProfile.twitter },
      tt: { val: publicProfile.tiktok, link: "https://twitter.com/" + publicProfile.tiktok },
    };
  }

  //RENDER
  if (!isLoadingPublic && publicProfile?.id == null) {
    return (
      <div className="mt-36 p-6 text-black z-50 relative">{"Sorry, user doesn't exist. Please try again later"}</div>
    );
  }

  if (publicProfile?.id) {
    return (
      <>
        <div className={`bg-white grow`}>
          {isAuth == "no" && <IsNotAuthMenu />}
          {isAuth == "no" && <div className="custom-top-cover absolute z-0"></div>}

          {/* ISPUBLIC AUTH TOP */}
          <div id="wildpay-top" className="profile mt-8 ml-6 mr-6 relative z-10">
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
                      <div className="flex flex-col mb-1">
                        <Link href={"/" + publicProfile.username} className="font-semibold mr-1 flex items-center">
                          @{publicProfile.username}
                        </Link>
                        <div className="mr-1 text-sm md:text-base">
                          <span className="font-semibold text-primary">{followersPublicData.followersCount}</span>{" "}
                          followers{" "}
                          <span className="font-semibold text-primary">{followersPublicData.followingCount}</span>{" "}
                          following
                        </div>
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
                      <div className="flex items-center text-xl font-semibold custom-text-blue">
                        ${convertEthToUsd(incomingEthTxSum + incomingBaseTxSum, nativeCurrencyPrice)}
                        <div className="tooltip tooltip-top" data-tip="All time">
                          <button className="ml-1">
                            <QuestionMarkCircleIcon width={14} />
                          </button>
                        </div>
                      </div>
                      <div className="text-xl flex items-center">
                        {(incomingEthTxSum + incomingBaseTxSum).toFixed(4)}Ξ
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* ISPUBLIC CHILDREN */}
          <PublicContext.Provider value={{ isLoadingPublic, publicProfile, refetchPublic }}>
            {/* ISAUTH FOLLOWERS MODAL */}
            <FollowersModal
              isOpen={isFollowersModalOpen}
              onClose={closeFollowersModal}
              data={followersPublicData}
              refetch={refetchPublicFollowers}
            ></FollowersModal>
            {children}
          </PublicContext.Provider>
        </div>
      </>
    );
  }
};

export default IsPublicLayout;
