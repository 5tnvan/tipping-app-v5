"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthUserLayout from "./AuthUserLayout";
import NotAuthUserLayout from "./NotAuthUserLayout";
import { AuthContext, AuthUserContext, AuthUserFollowsContext, AuthUserNotificationContext } from "./context";
import IsAdminLayout from "./isAdminLayout";
import { LineWave } from "react-loader-spinner";
import { WildPayLogo } from "~~/components/app/WildpayLogo";
import { useAuth } from "~~/hooks/app/useAuth";
import { useFollowers } from "~~/hooks/app/useFollowers";
import { useNotifications } from "~~/hooks/app/useNotifications";
import { useProfile } from "~~/hooks/app/useProfile";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Wildpay App",
  description: "Wildpay | Dare to get paid?",
});
/**
 * WILDPAY APP LAYOUT
 * Entry point to the app
 **/
const WildPayApp = ({ children }: { children: React.ReactNode }) => {
  /* CHECK ROUTES */
  const pathname = usePathname();
  const isRoot = pathname === "/";
  const isDebug = pathname === "/debug";
  const isPrivate = pathname === "/private";
  const isBlockExplorer = pathname.includes("/blockexplorer");

  /* PROVIDE CONTEXTS */
  const { isAuthenticated, user, refetch: refetchAuth } = useAuth(); //<AuthContext>
  const { isAuth, profile, refetch: refetchAuthUser } = useProfile(); //<AuthUserContext>
  const { isLoading: isLoadingFollows, followers, following, refetch: refetchFollows } = useFollowers(); //<AuthUserFollowsContext>
  const { isLoading: isLoadingNotifications, notifications, refetch: refetchNotifications } = useNotifications(); //<AuthUserNotificationContext>

  /* SWITCH UI */
  const bgClass = isAuth === "yes" ? "bg-white" : isAuth === "no" ? "custom-gradient-02" : "bg-white";

  console.log(isAuthenticated);

  return (
    <>
      <AuthContext.Provider value={{ isAuthenticated, user, refetchAuth }}>
        <AuthUserContext.Provider value={{ isAuth, profile, refetchAuthUser }}>
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
          <AuthUserFollowsContext.Provider value={{ isLoadingFollows, followers, following, refetchFollows }}>
            <AuthUserNotificationContext.Provider
              value={{ isLoadingNotifications, notifications, refetchNotifications }}
            >
              {isAuthenticated != "init" && !isRoot && !isDebug && !isBlockExplorer && !isPrivate && (
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
            </AuthUserNotificationContext.Provider>
          </AuthUserFollowsContext.Provider>

          {/*
           * ADMIN AREA
           * /debug: debugging SC
           * /blockexplorer: view local transactions
           */}
          {(isDebug || isBlockExplorer) && <IsAdminLayout>{children}</IsAdminLayout>}

          {/*
           * EXPERIMENT PAGE
           * /private: clean page without any layout for experimentations
           */}
          {isPrivate && <>{children}</>}
        </AuthUserContext.Provider>
      </AuthContext.Provider>
    </>
  );
};

export default WildPayApp;
