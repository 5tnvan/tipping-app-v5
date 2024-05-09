import { useContext, useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { insertFollowing } from "./(profile)/[username]/actions";
import { AuthContext, AuthUserFollowsContext, ModalsContext, UserContext, UserFollowsContext } from "./context";
import { incrementBioView } from "./profile/actions";
import { ChevronRightIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { IsLoading } from "~~/components/app/IsLoading";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { IsNotAuthMenu } from "~~/components/app/authentication/IsNotAuthMenu";
import { BioModal } from "~~/components/app/modal/BioModal";
import { FollowersModal } from "~~/components/app/modal/FollowersModal";
import { ArrowRightIcon } from "~~/components/assets/ArrowRightIcon";
import { SocialIcons } from "~~/components/assets/SocialIcons";
import { useFollowersByUsername } from "~~/hooks/app/useFollowers";
import { useProfileByUsername } from "~~/hooks/app/useProfileByUsername";
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

const UserIntroLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { username } = useParams();
  const nativeCurrencyPrice = useNativeCurrencyPrice();

  /* CONSUME CONTEXT */
  const { isAuthenticated } = useContext(AuthContext);
  const { refetchFollows: refetchAuthUserFollows } = useContext(AuthUserFollowsContext);

  /* PROVIDE CONTEXT */
  const { isLoading: isLoadingUser, profile, refetch: refetchUser } = useProfileByUsername(username); //<UserContext>
  // eslint-disable-next-line prettier/prettier
  const { isLoading: isLoadingFollows, followed, followers, following, refetch: refetchFollows } = useFollowersByUsername(username);//<UserFollowsContext>

  /* TRANSACTIONS VARIABLES */
  const [incomingEthTxSum, setIncomingEthTxSum] = useState(0);
  const [incomingBaseTxSum, setIncomingBaseTxSum] = useState(0);

  /* FETCH TRANSACTIONS */
  const incomingRes = useIncomingTransactions(profile?.wallet_id);
  const outgoingRes = useOutgoingTransactions(profile?.wallet_id);

  useEffect(() => {
    setIncomingEthTxSum(calculateSum(incomingRes.ethereumData));
    setIncomingBaseTxSum(calculateSum(incomingRes.baseData));
  }, [incomingRes, outgoingRes]);

  //HANDLE FOLLOW
  const handleFollow = () => {
    if (isAuthenticated == "yes" && !followed) {
      insertFollowing(profile.id);
      refetchFollows();
      refetchAuthUserFollows();
    } else if (isAuthenticated == "no") {
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

  //BIO MODAL
  const [isBioModalOpen, setBioModalOpen] = useState(false);

  const openBioModal = () => {
    refetchUser();
    //!refactor!
    if (profile?.profile_bios) {
      const firstBio = profile.profile_bios[0] as { id: string };
      incrementBioView(firstBio.id);
    }
    setBioModalOpen(true);
  };

  const handleBioCta = (openFastPayModal: () => void) => (num: any) => {
    if (num === 0) {
      closeBioModal();
      openFastPayModal();
    } else if (num === 1) {
      handleFollow();
      closeBioModal();
    }
  };

  const closeBioModal = () => {
    setBioModalOpen(false);
  };

  let soc;
  if (profile?.id) {
    soc = {
      le: { val: profile.lens, link: "https://lens.xyz/" + profile.lens },
      fc: { val: profile.farcaster, link: "https://warpcast.com/" + profile.farcaster },
      yt: { val: profile.youtube, link: "https://youtube.com/" + profile.youtube },
      ig: { val: profile.instagram, link: "https://instagram.com/" + profile.instagram },
      tw: { val: profile.twitter, link: "https://x.com/" + profile.twitter },
      tt: { val: profile.tiktok, link: "https://twitter.com/" + profile.tiktok },
    };
  }

  //RENDER
  if (!isLoadingUser && profile?.id == null) {
    return (
      <div className="mt-36 p-6 text-black z-50 relative">{"Sorry, user doesn't exist. Please try again later"}</div>
    );
  }

  return (
    <>
      <div className={`bg-white grow`}>
        {isAuthenticated == "no" && <IsNotAuthMenu />}
        {isAuthenticated == "no" && <div className="custom-top-cover absolute z-0"></div>}

        {/* ISPUBLIC AUTH TOP */}
        <div id="wildpay-top" className="profile mt-10 ml-6 mr-6 relative z-10">
          {/* ISPUBLIC PROFILE INTRO */}
          <div id="wildpay-user-intro" className="intro flex justify-between text-black mb-4">
            <div className="flex">
              {/* AUTHUSER PROFILE INTRO - AVATAR */}
              <div className="left mr-5 flex flex-col items-center">
                {isLoadingUser && <div className="w-16 h-16 animate-pulse rounded-full bg-slate-200"></div>}
                {!isLoadingUser && (
                  <>
                    {profile?.profile_bios?.length > 0 && (
                      <div className="cursor-pointer" onClick={openBioModal}>
                        <Avatar profile={profile} width={14} height={14} border={2} ring={16} gradient={"g-tropical"} />
                      </div>
                    )}
                    {profile?.profile_bios?.length == 0 && (
                      <Avatar profile={profile} width={14} height={14} border={0} ring={16} gradient={"g-white"} />
                    )}
                    <div
                      id="wildpay-avatar-cta"
                      className="btn text-xs h-6 min-h-6 pl-2 pr-2 bg-white text-black z-10 w-max gap-0 absolute top-12"
                      onClick={!isLoadingFollows && !followed ? () => handleFollow() : () => openFollowersModal()}
                    >
                      {isLoadingFollows && <span className="loading loading-ring loading-xs"></span>}
                      {!isLoadingFollows && !followed && (
                        <>
                          Follow
                          <ArrowRightIcon />
                        </>
                      )}
                      {!isLoadingFollows && followed && (
                        <>
                          <span>Followed</span>
                          <ChevronRightIcon width={8} />
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
              {/* AUTHUSER PROFILE INTRO - HANDLE&SOCIAL */}
              <div className="right info flex justify-center flex-col">
                {isLoadingUser ? (
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
                    <div className="flex flex-col text-secondary">
                      <Link href={"/" + profile.username} className="font-semibold mr-1 flex items-center">
                        @{profile.username}
                      </Link>
                      <div className="mr-1 text-sm">
                        <span className="font-semibold text-primary">{followers?.length}</span> followers{" "}
                        <span className="font-semibold text-primary">{following?.length}</span> following
                      </div>
                    </div>
                    <SocialIcons soc={soc} />
                  </>
                )}
              </div>
            </div>
            {/* AUTHUSER PROFILE INTRO - ETH BALANCE */}
            <div className="text-4xl text-black flex justify-center items-center gap-2">
              {isAuthenticated != "yes" || isLoadingUser ? (
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
                      {incomingEthTxSum + incomingBaseTxSum === 0
                        ? (incomingEthTxSum + incomingBaseTxSum).toFixed(2) + "Ξ"
                        : (incomingEthTxSum + incomingBaseTxSum).toFixed(4) + "Ξ"}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* ISPUBLIC CHILDREN */}
        <UserContext.Provider value={{ isLoadingUser, profile, refetchUser }}>
          <FollowersModal
            isOpen={isFollowersModalOpen}
            onClose={closeFollowersModal}
            data={{ followed, followers, following }}
            refetch={refetchFollows}
          ></FollowersModal>
          {isAuthenticated == "yes" && (
            <UserFollowsContext.Provider value={{ followed, followers, following }}>
              <ModalsContext.Consumer>
                {({ openFastPayModal }) => (
                  <BioModal
                    isOpen={isBioModalOpen}
                    onCta={handleBioCta(openFastPayModal)}
                    onClose={closeBioModal}
                    data={{ profile: profile, bios: profile.profile_bios }}
                  ></BioModal>
                )}
              </ModalsContext.Consumer>
            </UserFollowsContext.Provider>
          )}
          {isAuthenticated == "no" && (
            <BioModal
              isOpen={isBioModalOpen}
              onCta={handleBioCta}
              onClose={closeBioModal}
              data={{ profile: profile, bios: profile.profile_bios }}
            ></BioModal>
          )}

          {children}
        </UserContext.Provider>
      </div>
    </>
  );
};

export default UserIntroLayout;
