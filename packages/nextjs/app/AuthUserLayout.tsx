import { useContext, useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import AdminLayout from "./AdminLayout";
import AuthUserIntroLayout from "./AuthUserIntroLayout";
import UserIntroLayout from "./UserIntroLayout";
import {
  AuthContext,
  AuthUserContext,
  AuthUserFollowsContext,
  AuthUserNotificationContext,
  AuthUserPaymentContext,
  ModalsContext,
} from "./context";
import { GlobeAsiaAustraliaIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { WildPayLogo } from "~~/components/app/WildpayLogo";
import { IsAuthMenu } from "~~/components/app/authentication/IsAuthMenu";
import { CreateModal } from "~~/components/app/modal/CreateModal";
import { FastPayModal } from "~~/components/app/modal/FastPayModal";
import { ReceiptModal } from "~~/components/app/modal/ReceiptModal";
import { SearchModal } from "~~/components/app/modal/SearchModal";
import { useFollowers } from "~~/hooks/app/useFollowers";
import { useNotifications } from "~~/hooks/app/useNotifications";
import { useProfile } from "~~/hooks/app/useProfile";
import { useIncomingTransactions } from "~~/utils/app/fetch/fetchIncomingTransactions";
import { useOutgoingTransactions } from "~~/utils/app/fetch/fetchOutgoingTransactions";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "AuthUserLayout",
  description: "AuthUserLayout",
});

const AuthUserLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  /* CONSUME CONTEXT */
  const { isAuthenticated } = useContext(AuthContext);

  /* PROVIDE CONTEXT */
  const { profile, refetch: refetchAuthUser } = useProfile(); //<AuthUserContext>
  const { isLoading: isLoadingFollows, followers, following, refetch: refetchFollows } = useFollowers(); //<AuthUserFollowsContext>
  const { isLoading: isLoadingNotifications, notifications, refetch: refetchNotifications } = useNotifications(); //<AuthUserNotificationContext>
  const incomingRes = useIncomingTransactions(profile?.wallet_id); //<AuthUserPaymentContext>
  const outgoingRes = useOutgoingTransactions(profile?.wallet_id); //<AuthUserPaymentContext>

  /* CHECK ROUTES */
  const { username } = useParams();
  const pathname = usePathname();
  const isHome = pathname === "/home";
  const isProfile = pathname.includes("/profile");
  const isSettings = pathname.includes("/settings");
  const isLevels = pathname === "/levels";
  const isNotification = pathname === "/notifications";
  const isTransaction = pathname.includes("/transaction");
  const isLeaderboard = pathname === "/leaderboard";
  const isBios = pathname === "/bios";
  const isSignUpSuccess = pathname == "/signup/success";
  const isDebug = pathname === "/debug";
  const isBlockExplorer = pathname.includes("/blockexplorer");

  /*
   * REDIRECT
   * If user is authenticated and visits these pages, redirect to index
   */
  const isGetStarted = pathname.includes("/getstarted");
  //const isLogin = pathname.includes("/login");
  const isSignUpNew = pathname == "/signup/new";
  const isSignUpVerify = pathname == "/signup/verify";

  useEffect(() => {
    if (isAuthenticated === "yes" && (isGetStarted || isSignUpNew || isSignUpVerify)) {
      window.location.href = "/";
    }
  }, [isAuthenticated, isGetStarted, isSignUpNew, isSignUpVerify, router]);

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
      <AuthUserContext.Provider value={{ profile, refetchAuthUser }}>
        <AuthUserFollowsContext.Provider value={{ isLoadingFollows, followers, following, refetchFollows }}>
          <AuthUserNotificationContext.Provider value={{ isLoadingNotifications, notifications, refetchNotifications }}>
            <ModalsContext.Provider
              value={{ openFastPayModal, closeFastPayModal, openSearchModal, closeSearchModal, openCreateModal }}
            >
              <div id="wildpay-is-auth" className="bg-white grow max-h-dvh">
                {/*
                 * AUTHUSER DROPDOWN
                 * The dropdown menu on right top corner
                 */}
                {isAuthenticated != "yes" && (
                  <div className="z-10 wildui-menu absolute">
                    <div tabIndex={0} role="button" className="btn animate-pulse w-20"></div>
                  </div>
                )}
                {isAuthenticated == "yes" && <IsAuthMenu />}

                {/*
                 * AUTHUSER UI
                 * 100px Thin strip on top for these pages
                 */}
                <div
                  className={`custom-top-cover absolute z-0 ${
                    (isHome || isTransaction || isLeaderboard || isNotification || isLevels || isBios) && "h-100px"
                  }`}
                ></div>

                {/*
                 * USER TOP INTRO
                 * User with payment context
                 * /[username]: checkout profile of a user via their @handle
                 */}
                {username && <UserIntroLayout>{children}</UserIntroLayout>}

                {/*
                 * USER TOP INTRO
                 * Authenticated user with payment context
                 * /profile: checkout profile of authenticated user
                 * /settings: checkout settings of authenticated user
                 */}
                <AuthUserPaymentContext.Provider value={{ incomingRes, outgoingRes }}>
                  {(isProfile || isSettings || isSignUpSuccess) && (
                    <AuthUserIntroLayout>{children}</AuthUserIntroLayout>
                  )}
                  {(isHome || isTransaction || isLeaderboard || isNotification || isLevels || isBios) && (
                    <>{children}</>
                  )}
                </AuthUserPaymentContext.Provider>
              </div>

              {/* WILDPAY RECEIPT MODAL */}
              {hashRes && (
                <ReceiptModal
                  hash={hashRes}
                  isOpen={isPayReceiptModalOpen}
                  onClose={closePayReceiptModal}
                ></ReceiptModal>
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

              {/*
               * WILDPAY BOTTOM NAVIGATION
               * Bottom nav with 5 tabs
               */}
              <div
                id="wildpay-app-menu"
                className="flex justify-around absolute bottom-0 text-white items-center custom-bg-blue w-full h-14 z-40 text-sm"
              >
                {/* WILDPAY MENU @HOME */}
                <button
                  className="flex flex-col items-center hover:text-neutral-400"
                  onClick={() => router.push("/home")}
                >
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
                <button
                  className="flex flex-col items-center hover:text-neutral-400"
                  onClick={() => router.push("/bios")}
                >
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
          </AuthUserNotificationContext.Provider>
        </AuthUserFollowsContext.Provider>
        {/*
         * ADMIN AREA
         * /debug: debugging SC
         * /blockexplorer: view local transactions
         */}
        {(isDebug || isBlockExplorer) && <AdminLayout>{children}</AdminLayout>}
      </AuthUserContext.Provider>
    );
};

export default AuthUserLayout;
