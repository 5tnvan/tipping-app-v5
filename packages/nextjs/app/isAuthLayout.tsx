import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { AccountingContext, AppContext, WithdrawContext } from "./context";
import IsPublicLayout from "./isPublicLayout";
import { updateProfileAvatar } from "./profile/actions";
import { HomeIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { IsLoading } from "~~/components/app/IsLoading";
import { WildPayLogo } from "~~/components/app/WildpayLogo";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { IsAuthMenu } from "~~/components/app/authentication/IsAuthMenu";
import { FastPayModal } from "~~/components/app/modal/FastPayModal";
import { ReceiptModal } from "~~/components/app/modal/ReceiptModal";
import { SearchModal } from "~~/components/app/modal/SearchModal";
import { DashCircleIcon } from "~~/components/assets/DashCircleIcon";
import { SocialIcons } from "~~/components/assets/SocialIcons";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const IsAuthLayout = ({
  children,
  onFastPaySuccess,
  onProfilePaySuccess,
  onWithdrawSuccess,
}: {
  children: React.ReactNode;
  onFastPaySuccess: () => void;
  onProfilePaySuccess: () => void;
  onWithdrawSuccess: () => void;
}) => {
  const router = useRouter();

  //CHECK /PATH/{PARAMS}
  const pathname = usePathname();
  const isHome = pathname === "/home";
  const isProfileEdit = pathname === "/profile/edit";
  const isSettings = pathname === "/settings";
  const { username } = useParams();

  //PARENTS CONTEXT:
  const { isLoadingAuth, user, profile, refetchAuth } = useContext(AppContext);
  const { withdrawBalance, incomingTxSum } = useContext(AccountingContext);
  const { withdrawSuccess } = useContext(WithdrawContext);

  //SOCIAL MEDIA LINKS:
  let soc = {};
  if (!username) {
    // Set up social media links using profile data
    soc = {
      yt: { val: profile.youtube, link: "https://youtube.com/" + profile.youtube },
      ig: { val: profile.instagram, link: "https://instagram.com/" + profile.instagram },
      tw: { val: profile.twitter, link: "https://x.com/" + profile.twitter },
      tt: { val: profile.tiktok, link: "https://tiktok.com/" + profile.tiktok },
    };
  }

  /**
   * ACTION: Listen to
   **/
  useEffect(() => {
    if (withdrawSuccess) {
      onWithdrawSuccess();
      console.log("isauthLayout: withdrawSuccess: router.refresh()");
      router.refresh();
    }
  }, [withdrawSuccess]);

  /**
   * ACTION: Open and close Pay Modal
   **/
  const [isFastPayModalOpen, setFastPayModalOpen] = useState(false);

  const openFastPayModal = () => {
    setFastPayModalOpen(true);
  };

  const closeFastPayModal = () => {
    setFastPayModalOpen(false);
  };

  /**
   * ACTION: Trigger parents and children on success
   **/
  const [hashRes, setHashRes] = useState();

  const handleFastPaySuccess = (hash: any) => {
    console.log("isAuthLayout: triggerWildpayLayout(hash)");
    closeFastPayModal(); //closes fast pay
    setTimeout(() => {
      onFastPaySuccess(); // trigger parent wildpay layout
      console.log("isAuthLayout: router.refresh()");
      router.refresh();
      setHashRes(hash); // set transaction hash
      openPayReceiptModal(); //open receipt
    }, 1000);
  };

  /**
   * ACTION: Trigger parents and children on success
   **/
  const handleProfilePaySuccess = () => {
    onProfilePaySuccess(); // trigger wildpayLayout
    console.log("isAuthLayout: handleProfilePaySuccess()");
    console.log("isAuthLayout: router.refresh()");
    router.refresh();
  };

  /**
   * ACTION: Open close receipt modal
   **/
  const [isPayReceiptModalOpen, setPayReceiptModalOpen] = useState(false);

  const openPayReceiptModal = () => {
    setPayReceiptModalOpen(true);
  };

  const closePayReceiptModal = () => {
    setPayReceiptModalOpen(false);
  };

  /**
   * ACTION: Open close search modal
   **/
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  const openSearchModal = () => {
    setSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  //AVATAR MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(1);
  const gif: Record<number, string> = {
    // Define gif type explicitly
    1: "https://media1.tenor.com/m/_wA-bSNP3KAAAAAC/pixel-art-pixels.gif",
    2: "https://media1.tenor.com/m/pSq-OwdqmHgAAAAC/heartbeat-static.gif",
    3: "https://media1.tenor.com/m/qA1mRnYpyfwAAAAC/pixel-heart.gif",
  };

  const handleAvatarEdit = () => {
    setIsModalOpen(true);
  };

  // Select image
  const handleImageClick = (index: any) => {
    setSelectedImage(index);
  };

  // Update avatar change to supabase
  const handleAvatarSave = async () => {
    if (selectedImage !== null) {
      const selectedImageUrl = gif[selectedImage];
      updateProfileAvatar(selectedImageUrl);
      setIsModalOpen(false);
      refetchAuth();
    }
  };

  return (
    <>
      <div id="wildpay-is-auth" className="bg-white grow pr-7 pl-7">
        {/* ISAUTH MENU DROPDOWN */}
        {isLoadingAuth ? (
          <>
            <div className="z-10 custom-is-auth-menu absolute">
              <div tabIndex={0} role="button" className="btn m-1 btn-primary bg-slate-300 animate-pulse w-24"></div>
            </div>
          </>
        ) : (
          <IsAuthMenu refetch={refetchAuth} />
        )}

        {/* ISAUTH AVATAR MODAL */}
        <dialog id="my_modal_3" className="modal" open={isModalOpen}>
          <div className="modal-box z-20 relative">
            <form method="dialog">
              {/* close */}
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
              {/* choose avatar */}
              <div className="mb-5 mt-5">Choose your avatar:</div>
              {Object.entries(gif).map(([index, src]) => (
                <div key={index} className="left avatar edit mr-5" onClick={() => handleImageClick(Number(index))}>
                  <div
                    className={`w-16 rounded-full edit mr-5 ring-primary ring-offset-base-100 ring-offset-2 ${
                      selectedImage === Number(index) ? "ring" : ""
                    }`}
                  >
                    <Image alt={`Image ${index}`} src={src} width={500} height={500} />
                  </div>
                </div>
              ))}
              {/* save */}
              <div className="flex justify-center">
                <button className="btn btn-neutral mt-3" onClick={() => handleAvatarSave()}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </dialog>

        {/* ISAUTH CUSTOM-BG */}
        <div className={`custom-bg-auth absolute z-0 ${isHome && "h-100px"}`}></div>

        {/* ISAUTH PROFILE INTRO */}
        {username && <IsPublicLayout onSuccess={handleProfilePaySuccess}>{children}</IsPublicLayout>}
        {!username && !isHome && (
          <>
            <div id="wildpay-is-auth-top" className="profile mt-10 relative z-10">
              <div id="wildpay-is-auth-user-intro" className="intro flex justify-between text-black mb-4">
                <div className="flex items-start">
                  {/* ISAUTH PROFILE INTRO - AVATAR */}
                  {/* ISAUTH PROFILE INTRO - @AVATAR (@PROFILE/VIEW @PROFILE/EDIT) */}
                  <div className="left mr-5 flex flex-col items-center ">
                    {isLoadingAuth ? (
                      <div className="avatar">
                        <div className="w-16 h-16 animate-pulse bg-slate-300 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"></div>
                      </div>
                    ) : (
                      <>
                        <Avatar profile={profile} width={16} ring={false} />
                        {isProfileEdit && (
                          <button
                            id="wildpay-avatar-cta"
                            className="absolute top-14 rounded-full bg-white w-5 h-5"
                            onClick={() => handleAvatarEdit()}
                          >
                            <DashCircleIcon />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                  {/* ISAUTH PROFILE INTRO - HANDLE&SOCIAL */}
                  {/* ISAUTH PROFILE INTRO - HANDLE&SOCIAL (@PROFILE/VIEW || @SETTINGS) */}
                  <div className="right info flex text-black justify-center flex-col">
                    {isLoadingAuth ? (
                      <>
                        <IsLoading shape="rounded-md" width={28} height={6} />
                        <IsLoading shape="rounded-md" width={28} height={8} />
                      </>
                    ) : (
                      <>
                        {!isSettings && (
                          <>
                            <div className="font-semibold">@{profile.username}</div>
                            <SocialIcons soc={soc} />
                          </>
                        )}
                        {isSettings && (
                          <>
                            <div className="font-semibold">{user.email}</div>
                            <div className="flex">
                              <RainbowKitCustomConnectButton />
                            </div>
                            {/* {profile?.wallet_id ? (
                              <div className="flex">
                                <Address address={profile?.wallet_id} />
                                <CheckBadgeIcon width="20" />
                              </div>
                            ) : (
                              <div>No verified wallet</div>
                            )} */}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {/* ISAUTH PROFILE INTRO - ETH BALANCE */}
                {/* ISAUTH PROFILE INTRO - ETH BALANCE @PROFILE/VIEW || PROFILE/EDIT */}
                {/* ISAUTH PROFILE INTRO - ETH BALANCE @SETTINGS */}
                <div
                  className={`text-4xl text-black flex justify-center items-center gap-2 ${isProfileEdit && "hidden"}`}
                >
                  {isLoadingAuth && <IsLoading shape="rounded-md" width={28} height={8} />}
                  {!isLoadingAuth && !isSettings && <span className="text-xl">{incomingTxSum}Ξ</span>}
                  {!isLoadingAuth && isSettings && (
                    <>{profile.wallet_id && <span className="text-xl">{Number(withdrawBalance).toFixed(4)}Ξ</span>}</>
                  )}
                </div>
              </div>
            </div>
            {/* ISAUTH PROFILE CHILDREN */}
            {/* {isSettings && { children }}
            {!isSettings && { children }} */}
            {children}
          </>
        )}
        {/* ISAUTH HOME */}
        {!username && isHome && <>{children}</>}
      </div>

      {/* PAY RECEIPT MODAL */}
      {hashRes && (
        <ReceiptModal hash={hashRes} isOpen={isPayReceiptModalOpen} onClose={closePayReceiptModal}></ReceiptModal>
      )}

      {/* WILDPAY PAY MODAL */}
      <FastPayModal
        isOpen={isFastPayModalOpen}
        onClose={closeFastPayModal}
        onSuccess={handleFastPaySuccess}
      ></FastPayModal>

      {/* WILDPAY SEARCH MODAL */}
      <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal}></SearchModal>

      {/* WILDPAY MENU */}
      <div
        id="wildpay-app-menu"
        className="flex justify-around text-white items-center custom-bg-blue w-full h-14 z-40"
      >
        {/* WILDPAY MENU @HOME */}
        <button className="flex flex-col items-center" onClick={() => router.push("/home")}>
          <HomeIcon width={18} />
          Home
        </button>

        {/* WILDPAY MENU @FAST PAY */}
        <button id="wildpay-app-menu-pay" className="relative flex flex-col items-center" onClick={openFastPayModal}>
          <div className="rounded-full btn w-14 h-14 border bg-white flex justify-center items-center p-0">
            <WildPayLogo width="36" height="36" color="blue" />
          </div>
          <div className="font-semibold">Pay</div>
        </button>

        {/* WILDPAY MENU @SEARCH */}
        <button className="flex flex-col items-center" onClick={openSearchModal}>
          <MagnifyingGlassIcon width={18} />
          Search
        </button>
      </div>
    </>
  );
};

export default IsAuthLayout;
