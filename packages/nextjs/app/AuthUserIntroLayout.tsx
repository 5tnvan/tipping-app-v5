import { useContext, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext, AuthUserContext, AuthUserFollowsContext, AuthUserPaymentContext, ModalsContext } from "./context";
import { incrementBioView } from "./profile/actions";
import { ChevronRightIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { IsLoading } from "~~/components/app/IsLoading";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { AvatarModal } from "~~/components/app/modal/AvatarModal";
import { BioModal } from "~~/components/app/modal/BioModal";
import { SocialIcons } from "~~/components/assets/SocialIcons";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { calculateSum } from "~~/utils/app/functions/calculateSum";
import { convertEthToUsd } from "~~/utils/app/functions/convertEthToUsd";
import { findLatestBio } from "~~/utils/app/functions/findLatestBio";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "UserIntroLayout",
  description: "UserIntroLayout",
});

const AuthUserIntroLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const price = useGlobalState(state => state.nativeCurrencyPrice);
  const fusePrice = useGlobalState(state => state.fuseCurrencyPrice);

  //CHECK /PATH/{PARAMS}
  const pathname = usePathname();
  const isProfileEdit = pathname === "/profile/edit"; //PRIVATE
  const isSettings = pathname.includes("/settings"); //PRIVATE

  /* CONSUME CONTEXT */
  const { isAuthenticated, user } = useContext(AuthContext);
  const { profile, refetchAuthUser } = useContext(AuthUserContext);
  const { followers, following } = useContext(AuthUserFollowsContext);
  const { incomingRes, outgoingRes } = useContext(AuthUserPaymentContext);

  /* SOCIAL MEDIA LINKS */
  let soc = {};

  // Set up social media links using profile data
  soc = {
    le: { val: profile?.lens, link: "https://lens.xyz/" + profile?.lens },
    fc: { val: profile?.farcaster, link: "https://warpcast.com/" + profile?.farcaster },
    yt: { val: profile?.youtube, link: "https://youtube.com/" + profile?.youtube },
    ig: { val: profile?.instagram, link: "https://instagram.com/" + profile?.instagram },
    tw: { val: profile?.twitter, link: "https://x.com/" + profile?.twitter },
    tt: { val: profile?.tiktok, link: "https://tiktok.com/" + profile?.tiktok },
  };

  /**
   * HANDLE: Bio Modal
   **/
  const [isBioModalOpen, setBioModalOpen] = useState(false);

  const openBioModal = () => {
    refetchAuthUser(); //refetch profile to get the latest view count
    incrementBioView(findLatestBio(profile.profile_bios)?.id);
    setBioModalOpen(true);
  };

  const handleBioCta = (openFastPayModal: () => void) => (num: any) => {
    if (num === 0) {
      closeBioModal();
      openFastPayModal();
    } else if (num === 1) {
      closeBioModal();
      router.push(`/${profile.username}`);
    }
  };

  const closeBioModal = () => setBioModalOpen(false);

  /**
   * HANDLE: Avatar Modal
   **/
  const [isAvatarModalOpen, setAvatarModalOpen] = useState(false);
  const openAvatarModal = () => setAvatarModalOpen(true);
  const closeAvatarModal = () => setAvatarModalOpen(false);

  return (
    <>
      <div id="wildpay-top" className="profile mt-10 ml-6 mr-6 relative z-10 ">
        <div id="wildpay-user-intro" className="intro flex justify-between text-black mb-4">
          <div className="flex items-center">
            {/* AUTHUSER PROFILE INTRO - AVATAR */}
            {/* AUTHUSER PROFILE INTRO - @AVATAR (@PROFILE/VIEW @PROFILE/EDIT) */}
            <div className="left flex flex-col items-center ">
              {isAuthenticated != "yes" ? (
                <div className="avatar mr-5">
                  <div className="w-16 h-16 animate-pulse rounded-full bg-slate-200"></div>
                </div>
              ) : (
                <>
                  <div className={isSettings ? "mr-5 hidden md:block" : "mr-5"}>
                    {profile.profile_bios.length > 0 && (
                      <div className="cursor-pointer" onClick={openBioModal}>
                        <Avatar profile={profile} width={14} height={14} border={2} ring={16} gradient={"g-tropical"} />
                      </div>
                    )}
                    {profile.profile_bios.length == 0 && (
                      <Avatar profile={profile} width={14} height={14} border={0} ring={16} gradient={"g-white"} />
                    )}
                  </div>
                  {isProfileEdit && (
                    <div
                      id="wildpay-avatar-cta"
                      className="btn mr-5 text-xs h-6 min-h-6 pl-2 pr-2 bg-white text-black z-10 w-max gap-0 absolute top-12"
                      onClick={openAvatarModal}
                    >
                      Edit
                      <ChevronRightIcon width={8} />
                    </div>
                  )}
                </>
              )}
            </div>
            {/* AUTHUSER PROFILE INTRO - HANDLE&SOCIAL */}
            {/* AUTHUSER PROFILE INTRO - HANDLE&SOCIAL (@PROFILE/VIEW || @SETTINGS) */}
            <div className="right info flex text-black justify-center flex-col">
              {isAuthenticated != "yes" ? (
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
                  {!isSettings && (
                    <>
                      <div className="flex flex-col">
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
                  {isSettings && (
                    <>
                      <div className="font-semibold mb-1">{user.email}</div>
                      <div className="flex">
                        <RainbowKitCustomConnectButton btn="small" />
                        <FaucetButton />
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          {/* AUTHUSER PROFILE INTRO - ETH BALANCE */}
          {/* AUTHUSER PROFILE INTRO - ETH BALANCE @PROFILE/VIEW || PROFILE/EDIT */}
          <div className={`text-4xl text-black flex justify-center items-center gap-2 ${isProfileEdit && "hidden"}`}>
            {isAuthenticated != "yes" && <IsLoading shape="rounded-md" width={12} height={8} />}
            {isAuthenticated == "yes" && !isSettings && (
              <div className="flex flex-col items-end">
                <div className="flex items-center text-xl font-semibold custom-text-blue">
                  $
                  {(
                    convertEthToUsd(
                      calculateSum(incomingRes.ethereumData) + calculateSum(incomingRes.baseData),
                      price,
                    ) + convertEthToUsd(calculateSum(incomingRes.fuseData), fusePrice)
                  ).toFixed(2)}
                  <div className="tooltip tooltip-top" data-tip="All time">
                    <button className="ml-1">
                      <QuestionMarkCircleIcon width={14} />
                    </button>
                  </div>
                </div>
                <div className="text-xl flex items-center">
                  {(calculateSum(incomingRes.ethereumData) + calculateSum(incomingRes.baseData)).toFixed(4)}Ξ
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <AuthUserPaymentContext.Provider value={{ incomingRes, outgoingRes }}>{children}</AuthUserPaymentContext.Provider>

      {/* WILDPAY FASTPAY MODAL */}
      <ModalsContext.Consumer>
        {({ openFastPayModal }) => (
          <BioModal
            isOpen={isBioModalOpen}
            onCta={handleBioCta(openFastPayModal)}
            onClose={closeBioModal}
            data={{ profile: profile, latestBio: findLatestBio(profile.profile_bios) }}
          ></BioModal>
        )}
      </ModalsContext.Consumer>

      {/* WILDPAY AVATAR MODAL */}
      <AvatarModal isOpen={isAvatarModalOpen} onClose={closeAvatarModal}></AvatarModal>
    </>
  );
};

export default AuthUserIntroLayout;
