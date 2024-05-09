"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthUserLayout from "./AuthUserLayout";
import NotAuthUserLayout from "./NotAuthUserLayout";
import { AuthContext, AuthUserContext, FollowersContext, NotificationContext } from "./context";
import IsAdminLayout from "./isAdminLayout";
import { LineWave } from "react-loader-spinner";
import { WildPayLogo } from "~~/components/app/WildpayLogo";
import { useAuth } from "~~/hooks/app/useAuth";
import { useAuthUser } from "~~/hooks/app/useAuthUser";
import { usePrivateFollowers } from "~~/hooks/app/useFollowers";
import { useNotifications } from "~~/hooks/app/useNotifications";
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

  /* CREATE CONTEXTS */
  const { isAuthenticated, user, refetch: refetchAuth } = useAuth();
  const { isAuth, profile, refetch: refetchAuthUser } = useAuthUser();
  const { isLoading: isLoadingFollowers, followersData, refetch: refetchFollowers } = usePrivateFollowers();
  const { isLoading: isLoadingNotifications, notifications, refetch: refetchNotifications } = useNotifications();

  /* SWITCH UI */
  const bgClass = isAuth === "yes" ? "bg-white" : isAuth === "no" ? "custom-gradient-02" : "bg-white";

  /* CONSOLE LOG */
  // console.log("isAuthenticated", isAuthenticated);
  // console.log("wildLayout useAuthentication profile: ", profile);

  return (
    <>
      <AuthContext.Provider value={{ isAuthenticated, user, refetchAuth }}>
        <AuthUserContext.Provider value={{ isAuth, profile, refetchAuthUser }}>
          <FollowersContext.Provider value={{ isLoadingFollowers, followersData, refetchFollowers }}>
            <NotificationContext.Provider value={{ isLoadingNotifications, notifications, refetchNotifications }}>
              {/* PRIVATE PAGE */}
              {/* route: /private */}
              {isPrivate && <>{children}</>}
              {/* ADMIN AREA */}
              {/* route: /debug /blockexplorer */}
              {(isDebug || isBlockExplorer) && <IsAdminLayout>{children}</IsAdminLayout>}
              {/* LOADING UI */}
              {/* route: /* */}
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
                        wrapperStyle={{ "margin-left": "30px", "margin-top": "-40px" }}
                        wrapperClass=""
                        firstLineColor=""
                        middleLineColor=""
                        lastLineColor=""
                      />
                    </div>
                  </div>
                </main>
              )}
              {/* LANDING PAGE */}
              {/* route: wildpay.app */}
              {isAuthenticated != "init" && isRoot && (
                <main id="main" className="flex flex-col min-h-dvh h-full bg-black antialiased">
                  {children}
                </main>
              )}
              {/* THE APP */}
              {isAuthenticated != "init" && !isRoot && !isDebug && !isBlockExplorer && (
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
            </NotificationContext.Provider>
          </FollowersContext.Provider>
        </AuthUserContext.Provider>
      </AuthContext.Provider>
    </>
  );
};

export default WildPayApp;
