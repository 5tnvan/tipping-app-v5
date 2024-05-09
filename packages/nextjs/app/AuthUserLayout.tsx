import { useContext, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import AuthUserIntroLayout from "./AuthUserIntroLayout";
import UserIntroLayout from "./UserIntroLayout";
import { AuthContext, AuthUserContext, AuthUserPaymentContext, ModalsContext } from "./context";
import { GlobeAsiaAustraliaIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { WildPayLogo } from "~~/components/app/WildpayLogo";
import { IsAuthMenu } from "~~/components/app/authentication/IsAuthMenu";
import { CreateModal } from "~~/components/app/modal/CreateModal";
import { FastPayModal } from "~~/components/app/modal/FastPayModal";
import { ReceiptModal } from "~~/components/app/modal/ReceiptModal";
import { SearchModal } from "~~/components/app/modal/SearchModal";
import { useIncomingTransactions } from "~~/utils/app/fetch/fetchIncomingTransactions";
import { useOutgoingTransactions } from "~~/utils/app/fetch/fetchOutgoingTransactions";
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
  const isTransaction = pathname.includes("/transaction");
  const isProfile = pathname.includes("/profile");
  const isSettings = pathname.includes("/settings");
  const isLeaderboard = pathname === "/leaderboard";
  const isNotification = pathname === "/notifications"; //for auth user only
  const isLevels = pathname === "/levels"; //for auth user only
  const isBios = pathname === "/bios";
  const { username } = useParams();

  /* CONSUME CONTEXT */
  const { isAuthenticated } = useContext(AuthContext);
  const { profile } = useContext(AuthUserContext);

  /* FETCH TRANSACTIONS */
  const incomingRes = useIncomingTransactions(profile?.wallet_id);
  const outgoingRes = useOutgoingTransactions(profile?.wallet_id);

  console.log("incomingRes", incomingRes);
  console.log("outgoingRes", outgoingRes);

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
             * AUTHUSER USER
             * User with payment context
             * /[username]: checkout profile of a user via their @handle
             */}
            {username && <UserIntroLayout>{children}</UserIntroLayout>}

            {/*
             * AUTHUSER AUTHENTICATED USER
             * Authenticated user with payment context
             * /profile: checkout profile of authenticated user
             * /settings: checkout settings of authenticated user
             */}
            <AuthUserPaymentContext.Provider value={{ incomingRes, outgoingRes }}>
              {!username && (isProfile || isSettings) && <AuthUserIntroLayout>{children}</AuthUserIntroLayout>}
              {(isHome || isTransaction || isLeaderboard || isNotification || isLevels || isBios) && <>{children}</>}
            </AuthUserPaymentContext.Provider>
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
