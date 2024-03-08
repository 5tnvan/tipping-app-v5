import { useContext, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Router } from "next/router";
import { AppContext } from "./context";
import { updateProfileAvatar } from "./profile/actions";
import { IsLoading } from "~~/components/app/IsLoading";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { IsAuthMenu } from "~~/components/app/authentication/IsAuthMenu";
import { SearchModal } from "~~/components/app/modal/SearchModal";
import { DashCircleIcon } from "~~/components/assets/DashCircleIcon";
import { HomeIcon } from "~~/components/assets/HomeIcon";
import { SearchIcon } from "~~/components/assets/SearchIcon";
import { SocialIcons } from "~~/components/assets/SocialIcons";
import { Address } from "~~/components/scaffold-eth";
import TipsValueSum from "~~/components/subgraph/TipsValueSum";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const IsAuthLayout = ({ children }: { children: React.ReactNode }) => {
  //Search Modal

  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  const openSearchModal = () => {
    setSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setSearchModalOpen(false);
  };

  //App Context
  const { isLoading, isAuth, user, profile, refetch } = useContext(AppContext);

  //Check pathname
  const pathname = usePathname();
  const isProfileEdit = pathname === "/profile/edit";
  const isSettings = pathname === "/settings";

  //Set-up social media links
  const soc = {
    yt: { val: profile.youtube, link: "https://youtube.com/" + profile.youtube },
    ig: { val: profile.instagram, link: "https://instagram.com/" + profile.instagram },
    tw: { val: profile.twitter, link: "https://x.com/" + profile.twitter },
    tt: { val: profile.tiktok, link: "https://twitter.com/" + profile.tiktok },
  };

  //Avatar update
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(1);
  const gif = {
    1: "https://media1.tenor.com/m/_wA-bSNP3KAAAAAC/pixel-art-pixels.gif",
    2: "https://media1.tenor.com/m/pSq-OwdqmHgAAAAC/heartbeat-static.gif",
    3: "https://media1.tenor.com/m/qA1mRnYpyfwAAAAC/pixel-heart.gif",
  };

  const handleAvatarEdit = () => {
    setIsModalOpen(true);
  };

  // Select image
  const handleImageClick = index => {
    setSelectedImage(index);
  };

  // Update avatar change to supabase
  const handleAvatarSave = async () => {
    if (selectedImage !== null) {
      const selectedImageUrl = gif[selectedImage];
      updateProfileAvatar(selectedImageUrl);
      setIsModalOpen(false);
      refetch();
    }
  };

  return (
    <>
      <div id="wildpay-is-auth" className="bg-white grow pr-7 pl-7">
        {/* SEARCH MODAL*/}
        <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal}>
          <h2>Modal Content</h2>
          <p>This is the content of the modal.</p>
        </SearchModal>

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
        {/* AVATAR MODAL */}
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
        {/* CUSTOM-BG-AUTH */}
        <div className="custom-bg-auth absolute z-0 rounded-t-2xl"></div>

        {/* USER INTRO */}
        <div id="wildpay-is-auth-top" className="profile mt-20 relative z-10">
          <div id="wildpay-is-auth-user-intro" className="intro flex justify-between text-black mb-4">
            <div className="flex items-start">
              {/* USER INTRO - AVATAR */}
              <div className="left mr-5 flex flex-col items-center ">
                {isLoading ? (
                  <div className="avatar">
                    <div className="w-16 animate-pulse bg-slate-300 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"></div>
                  </div>
                ) : (
                  <>
                    <Avatar profile={profile} width={16}/>
                    {isProfileEdit && (
                      <div
                        id="wildpay-avatar-cta"
                        className="relative rounded-full bg-white w-5 h-5"
                        onClick={() => handleAvatarEdit()}
                      >
                        <DashCircleIcon />
                      </div>
                    )}
                  </>
                )}
              </div>
              {/* USER INTRO - USERNAME + SOCIAL */}
              <div className="right info flex justify-center flex-col">
                {isLoading ? (
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
                        {profile?.wallet_id ? <Address address={profile?.wallet_id} /> : null}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            {/* USER INTRO - USER BALANCE */}
            <div className={`text-4xl flex justify-center items-center gap-2 ${isProfileEdit && "hidden"}`}>
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

      {/* WILDPAY APP MENU */}
      <div
        id="wildpay-app-menu"
        className="flex justify-around text-white items-center custom-bg-blue w-full h-14 z-40"
      >
        {/* HOME */}
        <div className="flex flex-col items-center">
          <HomeIcon />
          Home
        </div>

        {/* PAY */}
        <div className="flex flex-col items-center">
          <div className="rounded-full w-14 h-14 border bg-white flex justify-center items-center">
            <img className="z-10" src="/wildpay-logo.svg" width={35} height={35}></img>
          </div>
          <div className="mb-10 font-semibold">Pay</div>
        </div>

        <div className="flex flex-col items-center" onClick={openSearchModal}>
          <SearchIcon />
          Search
        </div>
      </div>
    </>
  );
};

export default IsAuthLayout;
