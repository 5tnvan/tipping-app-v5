"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthUserLayout from "./AuthUserLayout";
import NotAuthUserLayout from "./NotAuthUserLayout";
import { AuthContext } from "./context";
import { LineWave } from "react-loader-spinner";
import { WildPayLogo } from "~~/components/app/WildpayLogo";
import { useAuth } from "~~/hooks/app/useAuth";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Wildpay App",
  description: "Wildpay | Social Wallet",
});
/**
 * WILDPAY APP LAYOUT
 * Entry point to the app
 **/
const WildPayApp = ({ children }: { children: React.ReactNode }) => {
  /* CHECK ROUTES */
  const pathname = usePathname();
  const isRoot = pathname === "/";

  /* PROVIDE CONTEXTS */
  const { isAuthenticated, user, refetch: refetchAuth } = useAuth(); //<AuthContext>

  /* SWITCH UI */
  const bgClass = isAuthenticated === "yes" ? "bg-white" : isAuthenticated === "no" ? "custom-gradient-02" : "bg-white";

  console.log("wildpayLayout isAuthenticated", isAuthenticated);

  return (
    <>
      <AuthContext.Provider value={{ isAuthenticated, user, refetchAuth }}>
        {/*
         * LOADING UI
         * Loading indicator when authentication is init
         */}
        {isAuthenticated == "init" && (
          <main id="main" className="flex justify-center items-center min-h-dvh h-full bg-black antialiased">
            <div className="flex flex-col items-center">
              <div className="flex flex-row gap-2 items-center">
                <WildPayLogo color="blue" width="40" height="40" />
                <h1 className="text-3xl font-semibold custom-text-blue z-10">wildpay</h1>
              </div>

              <div className="flex flex-row">
                <LineWave
                  visible={true}
                  height="100"
                  width="100"
                  color="#3D45E7"
                  ariaLabel="line-wave-loading"
                  wrapperStyle={{ marginLeft: "30px", marginTop: "-40px" }}
                  wrapperClass=""
                  firstLineColor=""
                  middleLineColor=""
                  lastLineColor=""
                />
              </div>
            </div>
          </main>
        )}

        {/*
         * LANDING PAGE
         * Index page for all users
         */}
        {isAuthenticated != "init" && isRoot && (
          <main id="main" className="flex flex-col min-h-dvh h-full bg-black antialiased">
            {children}
          </main>
        )}

        {/*
         * THE APP AREA
         * All pages of the app
         * /home: user's dashboard
         * /bios: discover others with infinite swipe
         * /levels: level up using invitation codes
         * /profile: view user's profile
         * /settings: view user's settings
         */}

        {isAuthenticated != "init" && !isRoot && (
          <div id="master" className="min-h-full bg-neutral-950 antialiased">
            <main id="main" className="flex justify-center min-h-dvh h-full text-black">
              <div id="wildpay" className={`flex flex-col ${bgClass} relative z-10 max-h-dvh`}>
                <Link href="/" id="wildpay-logo" className="flex w-max items-center z-10 pl-6 pt-7">
                  <WildPayLogo color="blue" width="30" height="30" />
                  <h1 className="text-lg font-semibold custom-text-blue ml-2 mb-0 z-10">wildpay</h1>
                </Link>
                {isAuthenticated == "yes" && <AuthUserLayout>{children}</AuthUserLayout>}
                {isAuthenticated == "no" && <NotAuthUserLayout>{children}</NotAuthUserLayout>}
              </div>
            </main>
          </div>
        )}
      </AuthContext.Provider>
    </>
  );
};

export default WildPayApp;
