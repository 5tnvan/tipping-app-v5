import { useContext, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import AuthUserIntroLayout from "./AuthUserIntroLayout";
import UserIntroLayout from "./UserIntroLayout";
import { AuthContext, AuthUserContext, ModalsContext } from "./context";
import { GlobeAsiaAustraliaIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { WildPayLogo } from "~~/components/app/WildpayLogo";
import { IsAuthMenu } from "~~/components/app/authentication/IsAuthMenu";
import { CreateModal } from "~~/components/app/modal/CreateModal";
import { FastPayModal } from "~~/components/app/modal/FastPayModal";
import { ReceiptModal } from "~~/components/app/modal/ReceiptModal";
import { SearchModal } from "~~/components/app/modal/SearchModal";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "AuthUserLayout",
  description: "AuthUserLayout",
});

const AuthUserLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  //CHECK /PATH/{PARAMS}
  const pathname = usePathname();
  const isHome = pathname === "/home"; //for auth user only
  const isLogin = pathname === "/login";
  const isTransaction = pathname.includes("/transaction");
  const isLeaderboard = pathname === "/leaderboard";
  const isNotification = pathname === "/notifications"; //for auth user only
  const isLevels = pathname === "/levels"; //for auth user only
  const isBios = pathname === "/bios";
  const { username } = useParams();

  /* CONSUME CONTEXT */
  const { isAuthenticated } = useContext(AuthContext);
  const { profile } = useContext(AuthUserContext);

  /**
   * HANDLE: Fastpay Modal
   **/
  const [isFastPayModalOpen, setFastPayModalOpen] = useState(false);
  const openFastPayModal = () => setFastPayModalOpen(true);
  const closeFastPayModal = () => setFastPayModalOpen(false);

  const [hashRes, setHashRes] = useState();
  const handleFastPaySuccess = (hash: any) => {
    closeFastPayModal(); //closes fast pay
    console.log("AuthUserLayout: closesFastPayModal");
    setHashRes(hash); // set transaction hash
    console.log("AuthUserLayout: setHashRes(hash)", hash);
    openPayReceiptModal(); //open receipt
  };

  /**
   * HANDLE: Receipt Modal
   **/
  const [isPayReceiptModalOpen, setPayReceiptModalOpen] = useState(false);
  const openPayReceiptModal = () => setPayReceiptModalOpen(true);
  const closePayReceiptModal = () => setPayReceiptModalOpen(false);

  /**
   * HANDLE: Search Modal
   **/
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const openSearchModal = () => setSearchModalOpen(true);
  const closeSearchModal = () => setSearchModalOpen(false);

  /**
   * HANDLE: Create Modal
   **/
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);

  if (profile)
    return (
      <>
        <ModalsContext.Provider
          value={{ openFastPayModal, closeFastPayModal, openSearchModal, closeSearchModal, openCreateModal }}
        >
          <div id="wildpay-is-auth" className="bg-white grow max-h-dvh">
            {/* AUTHUSER DROPDOWN*/}
            {/* AUTHUSER DROPDOWN: loading */}
            {isAuthenticated != "yes" && (
              <div className="z-10 wildui-menu absolute">
                <div tabIndex={0} role="button" className="btn animate-pulse w-20"></div>
              </div>
            )}
            {/* AUTHUSER DROPDOWN: finished loading */}
            {isAuthenticated == "yes" && <IsAuthMenu />}

            {/* AUTHUSER Thin Strip UI */}
            {/* These pages have a 100px strip on top */}
            <div
              className={`custom-top-cover absolute z-0 ${
                (isHome || isTransaction || isLeaderboard || isNotification || isLevels || isBios) && "h-100px"
              }`}
            ></div>

            {/* AUTHUSER */}
            {/* AUTHUSER: /username */}
            {username && <UserIntroLayout>{children}</UserIntroLayout>}
            {/* AUTHUSER: /profile/view, /profile/edit, /settings */}
            {!username &&
              !isHome &&
              !isTransaction &&
              !isLogin &&
              !isLeaderboard &&
              !isNotification &&
              !isLevels &&
              !isBios && (
                <>
                  <AuthUserIntroLayout>{children}</AuthUserIntroLayout>
                  {/* <div id="wildpay-top" className="profile mt-10 ml-6 mr-6 relative z-10 ">
                    <div id="wildpay-user-intro" className="intro flex justify-between text-black mb-4">
                      <div className="flex items-center">
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
                                    <Avatar
                                      profile={profile}
                                      width={14}
                                      height={14}
                                      border={2}
                                      ring={16}
                                      gradient={"g-tropical"}
                                    />
                                  </div>
                                )}
                                {profile.profile_bios.length == 0 && (
                                  <Avatar
                                    profile={profile}
                                    width={14}
                                    height={14}
                                    border={0}
                                    ring={16}
                                    gradient={"g-white"}
                                  />
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
                                    <Link
                                      href={"/" + profile.username}
                                      className="font-semibold mr-1 flex items-center"
                                    >
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
                      <div
                        className={`text-4xl text-black flex justify-center items-center gap-2 ${
                          isProfileEdit && "hidden"
                        }`}
                      >
                        {isAuthenticated != "yes" && <IsLoading shape="rounded-md" width={12} height={8} />}
                        {isAuthenticated == "yes" && !isSettings && (
                          <div className="flex flex-col items-end">
                            <div className="flex items-center text-xl font-semibold custom-text-blue">
                              <div>${convertEthToUsd(incomingEthTxSum + incomingBaseTxSum, nativeCurrencyPrice)}</div>
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
                        )}
                      </div>
                    </div>
                  </div>
                  {children} */}
                </>
              )}
            {/* AUTHUSER: /home, /transaction, /leaderboard */}
            {(isHome || isTransaction || isLeaderboard || isNotification || isLevels || isBios) && <>{children}</>}
          </div>

          {/* WILDPAY RECEIPT MODAL */}
          {hashRes && (
            <ReceiptModal hash={hashRes} isOpen={isPayReceiptModalOpen} onClose={closePayReceiptModal}></ReceiptModal>
          )}

          {/* WILDPAY FASTPAY MODAL */}
          <FastPayModal
            isOpen={isFastPayModalOpen}
            onClose={closeFastPayModal}
            onSuccess={handleFastPaySuccess}
          ></FastPayModal>

          {/* WILDPAY SEARCH MODAL */}
          <SearchModal isOpen={isSearchModalOpen} onClose={closeSearchModal}></SearchModal>

          {/* WILDPAY CREATE MODAL */}
          <CreateModal isOpen={isCreateModalOpen} onClose={closeCreateModal}></CreateModal>

          {/* WILDPAY APP BOTTOM MENU */}
          <div
            id="wildpay-app-menu"
            className="flex justify-around absolute bottom-0 text-white items-center custom-bg-blue w-full h-14 z-40 text-sm"
          >
            {/* WILDPAY MENU @HOME */}
            <button className="flex flex-col items-center hover:text-neutral-400" onClick={() => router.push("/home")}>
              <div className="w-5 md:w-4">
                <HomeIcon />
              </div>
              <div className="hidden md:block pl-1 pr-1">Home</div>
            </button>

            {/* WILDPAY MENU @CREATE */}
            <button className="flex flex-col items-center hover:text-neutral-400" onClick={openCreateModal}>
              <div className="w-6 md:w-4">
                <PlusCircleIcon />
              </div>
              <div className="hidden md:block pl-1 pr-1">Create</div>
            </button>

            {/* WILDPAY MENU @FAST PAY */}
            <button
              id="wildpay-app-menu-pay"
              className="relative flex flex-col items-center"
              onClick={openFastPayModal}
            >
              <div className="rounded-full btn w-12 md:w-14 h-12 md:h-14 border border-primary bg-white flex justify-evenly items-center p-0">
                <WildPayLogo width="36" height="36" color="blue" />
              </div>
              <div className="hidden md:block font-semibold mt-1">Pay</div>
            </button>

            {/* WILDPAY MENU @DISCOVER */}
            <button className="flex flex-col items-center hover:text-neutral-400" onClick={() => router.push("/bios")}>
              <div className="w-6 md:w-4">
                <GlobeAsiaAustraliaIcon />
              </div>
              <div className="hidden md:block">Discover</div>
            </button>

            {/* WILDPAY MENU @SEARCH */}
            <button className="flex flex-col items-center hover:text-neutral-400" onClick={openSearchModal}>
              <div className="w-5 md:w-4">
                <MagnifyingGlassIcon />
              </div>
              <div className="hidden md:block">Search</div>
            </button>
          </div>
        </ModalsContext.Provider>
      </>
    );
};

export default AuthUserLayout;
