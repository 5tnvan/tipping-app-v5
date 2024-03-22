"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountingContext, AppContext, FollowersContext, ProfilePayContext, WithdrawContext } from "./context";
import IsAuthLayout from "./isAuthLayout";
import IsNotAuthLayout from "./isNotAuthLayout";
import { Footer } from "~~/components/Footer";
import { WildPayLogo } from "~~/components/app/WildpayLogo";
import { WavyBackground } from "~~/components/app/ui/wavyBackground";
import { useAccounting } from "~~/hooks/app/useAccounting";
import { useAuthentication } from "~~/hooks/app/useAuthentication";
import { usePrivateFollowers } from "~~/hooks/app/useFollowers";
import { useProfilePay } from "~~/hooks/app/useProfilePay";
import { useWithdraw } from "~~/hooks/app/useWithdraw";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const WildPay = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isRoot = pathname === "/";
  const isDebug = pathname === "/debug";
  const isBlockExplorer = pathname === "/blockexplorer";
  const { isLoading: isLoadingAuth, isAuth, user, profile, refetch: refetchAuth } = useAuthentication();
  const { isLoading: isLoadingFollowers, followersData, refetch: refetchFollowers } = usePrivateFollowers();
  const {
    withdrawBalance,
    incomingTx,
    incomingTxSum,
    outgoingTx,
    outgoingTxSum,
    refetch: refetchAccounting,
  } = useAccounting(profile.wallet_id);
  const { profilePaySuccess, setProfilePaySuccess } = useProfilePay();
  const { withdrawSuccess, setWithdrawSuccess } = useWithdraw();

  const bgClass = isAuth === "yes" ? "bg-white" : isAuth === "no" ? "custom-gradient-02" : "bg-white";
  const link = isAuth === "yes" ? "/home" : isAuth === "no" ? "/" : "/";

  const handlePaySuccess = () => {
    console.log("isWildLayout: handlePaySuccess()");
    console.log("isWildLayout: refetchAccounting()");
    refetchAccounting(); // refetch private accounting
  };
  const handleWithdrawSuccess = () => {
    console.log("isWildLayout: handleWithdrawSuccess()");
    console.log("isWildLayout: refetchAccounting()");
    refetchAccounting(); // refetch private accounting
  };
  // console.log("wildLayout: user ", user);
  // console.log("wildLayout: (private)followersData ", followersData);
  // console.log(
  //   "wildLayout: withdrawBalance, incomingTxSum, outgoingTxSum ",
  //   withdrawBalance,
  //   incomingTxSum,
  //   outgoingTxSum,
  // );

  return (
    <>
      {isRoot && (
        <>
          <AppContext.Provider value={{ isLoadingAuth, isAuth, user, profile, refetchAuth }}>
            <main id="main" className="flex min-h-screen h-full">
              {children}
            </main>
          </AppContext.Provider>
        </>
      )}
      {!isRoot && (
        <>
          <AppContext.Provider value={{ isLoadingAuth, isAuth, user, profile, refetchAuth }}>
            <AccountingContext.Provider
              value={{ withdrawBalance, incomingTx, incomingTxSum, outgoingTx, outgoingTxSum, refetchAccounting }}
            >
              <FollowersContext.Provider value={{ isLoadingFollowers, followersData, refetchFollowers }}>
                <ProfilePayContext.Provider value={{ profilePaySuccess, setProfilePaySuccess }}>
                  <WithdrawContext.Provider value={{ withdrawSuccess, setWithdrawSuccess }}>
                    <div id="master" className="min-h-full bg-neutral-950 antialiased">
                      {/* <BackgroundBeams /> */}
                      <WavyBackground>
                        <main id="main" className="flex justify-center min-h-screen h-full text-black">
                          <div id="wildpay" className={`flex flex-col ${bgClass} relative z-10 max-h-screen`}>
                            <Link href={link} id="wildpay-logo" className="flex w-max items-center z-10 pl-7 pt-7">
                              <WildPayLogo color="blue" width="30" height="30" />
                              <h1 className="text-lg font-semibold custom-text-blue ml-2 mb-0 z-10">wildpay</h1>
                            </Link>
                            {isAuth == "yes" && !isDebug && !isBlockExplorer && (
                              <IsAuthLayout
                                onFastPaySuccess={handlePaySuccess}
                                onProfilePaySuccess={handlePaySuccess}
                                onWithdrawSuccess={handleWithdrawSuccess}
                              >
                                {children}
                              </IsAuthLayout>
                            )}
                            {isAuth == "no" && !isDebug && !isBlockExplorer && (
                              <IsNotAuthLayout>{children}</IsNotAuthLayout>
                            )}
                            {(isDebug || isBlockExplorer) && <>{children}</>}
                          </div>
                        </main>
                      </WavyBackground>
                    </div>
                    {/* <Toaster /> */}

                    {/* <Footer /> */}
                  </WithdrawContext.Provider>
                </ProfilePayContext.Provider>
              </FollowersContext.Provider>
            </AccountingContext.Provider>
          </AppContext.Provider>
        </>
      )}
    </>
  );
};

export default WildPay;
