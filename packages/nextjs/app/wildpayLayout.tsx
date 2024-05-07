"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppContext, FollowersContext, NotificationContext } from "./context";
import IsAdminLayout from "./isAdminLayout";
import IsAuthLayout from "./isAuthLayout";
import IsNotAuthLayout from "./isNotAuthLayout";
import { LineWave } from "react-loader-spinner";
import { WildPayLogo } from "~~/components/app/WildpayLogo";
import { useAuthentication } from "~~/hooks/app/useAuthentication";
import { usePrivateFollowers } from "~~/hooks/app/useFollowers";
import { useNotifications } from "~~/hooks/app/useNotifications";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const WildPay = ({ children }: { children: React.ReactNode }) => {
  /* CHECK ROUTES */
  const pathname = usePathname();
  const isRoot = pathname === "/";
  const isDebug = pathname === "/debug";
  const isPrivate = pathname === "/private";
  const isBlockExplorer = pathname.includes("/blockexplorer");

  /* CREATE CONTEXTS */
  const { isLoading: isLoadingAuth, isAuth, user, profile, bios, levels, refetch: refetchAuth } = useAuthentication();
  const { isLoading: isLoadingFollowers, followersData, refetch: refetchFollowers } = usePrivateFollowers();
  const { isLoading: isLoadingNotifications, notifications, refetch: refetchNotifications } = useNotifications();

  /* UI */
  const bgClass = isAuth === "yes" ? "bg-white" : isAuth === "no" ? "custom-gradient-02" : "bg-white";

  //console.log("wildLayout");
  //console.log("wildLayout useAuthentication profile: ", profile);
  //console.log("wildLayout usePrivateFollowers", followersData);
  //console.log("wildLayout notifications", notifications);

  return (
    <>
      <AppContext.Provider value={{ isLoadingAuth, isAuth, user, profile, bios, levels, refetchAuth }}>
        <FollowersContext.Provider value={{ isLoadingFollowers, followersData, refetchFollowers }}>
          <NotificationContext.Provider value={{ isLoadingNotifications, notifications, refetchNotifications }}>
            {/* PRIVATE PAGE */}
            {/* route: /test */}
            {isPrivate && <>{children}</>}
            {/* ADMIN AREA */}
            {/* route: /debug /blockexplorer */}
            {(isDebug || isBlockExplorer) && <IsAdminLayout>{children}</IsAdminLayout>}
            {/* LOADING UI */}
            {/* route: /* */}
            {isAuth == "init" && (
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
            {isAuth != "init" && isRoot && (
              <main id="main" className="flex flex-col min-h-dvh h-full bg-black antialiased">
                {children}
              </main>
            )}
            {/* THE APP */}
            {isAuth != "init" && !isRoot && !isDebug && !isBlockExplorer && (
              <div id="master" className="min-h-full bg-neutral-950 antialiased">
                <main id="main" className="flex justify-center min-h-dvh h-full text-black">
                  <div id="wildpay" className={`flex flex-col ${bgClass} relative z-10 max-h-dvh`}>
                    <Link href="/" id="wildpay-logo" className="flex w-max items-center z-10 pl-6 pt-7">
                      <WildPayLogo color="blue" width="30" height="30" />
                      <h1 className="text-lg font-semibold custom-text-blue ml-2 mb-0 z-10">wildpay</h1>
                    </Link>
                    {isAuth == "yes" && <IsAuthLayout>{children}</IsAuthLayout>}
                    {isAuth == "no" && <IsNotAuthLayout>{children}</IsNotAuthLayout>}
                  </div>
                </main>
              </div>
            )}
          </NotificationContext.Provider>
        </FollowersContext.Provider>
      </AppContext.Provider>
    </>
  );
};

export default WildPay;
