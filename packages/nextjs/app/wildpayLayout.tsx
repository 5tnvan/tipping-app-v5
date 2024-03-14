"use client";

import { usePathname } from "next/navigation";
import { AccountingContext, AppContext, FastPayContext, FollowersContext, WithdrawContext } from "./context";
import IsAuthLayout from "./isAuthLayout";
import IsNotAuthLayout from "./isNotAuthLayout";
import { useAccounting } from "~~/hooks/app/useAccounting";
import { useAuthentication } from "~~/hooks/app/useAuthentication";
import { useFastPay } from "~~/hooks/app/useFastPay";
import { useFollowers } from "~~/hooks/app/useFollowers";
import { useWithdraw } from "~~/hooks/app/useWithdraw";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const WildPay = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isDebug = pathname === "/debug";
  const isBlockExplorer = pathname === "/blockexplorer";
  const { isLoading: isLoadingAuth, isAuth, user, profile, refetch: refetchAuth } = useAuthentication();
  const { isLoading: isLoadingFollowers, followersData, refetch: refetchFollowers } = useFollowers(profile.id);
  const {
    withdrawBalance,
    incomingTx,
    incomingTxSum,
    outgoingTx,
    outgoingTxSum,
    refetch: refetchAccounting,
  } = useAccounting(profile.wallet_id);
  const { fastPaySuccess, setFastPaySuccess } = useFastPay();
  const { withdrawSuccess, setWithdrawSuccess } = useWithdraw();

  const bgClass = isAuth === "yes" ? "bg-slate-100" : isAuth === "no" ? "custom-gradient-02" : "";

  return (
    <>
      <AppContext.Provider value={{ isLoadingAuth, isAuth, user, profile, refetchAuth }}>
        <AccountingContext.Provider
          value={{ withdrawBalance, incomingTx, incomingTxSum, outgoingTx, outgoingTxSum, refetchAccounting }}
        >
          <FollowersContext.Provider value={{ isLoadingFollowers, followersData, refetchFollowers }}>
            <FastPayContext.Provider value={{ fastPaySuccess, setFastPaySuccess }}>
              <WithdrawContext.Provider value={{ withdrawSuccess, setWithdrawSuccess }}>
                <div id="wildpay" className={`flex flex-col ${bgClass} relative z-10 rounded-t-2xl`}>
                  <div id="wildpay-logo" className="flex items-center z-10 ml-7 mt-7">
                    <img className="z-10" src="/wildpay-logo.svg" width={30} height={30}></img>
                    <h1 className="font-semibold custom-text-blue ml-2 z-10">wildpay</h1>
                  </div>
                  {isAuth == "yes" && !isDebug && !isBlockExplorer && <IsAuthLayout>{children}</IsAuthLayout>}
                  {isAuth == "no" && !isDebug && !isBlockExplorer && <IsNotAuthLayout>{children}</IsNotAuthLayout>}
                  {(isDebug || isBlockExplorer) && <>{children}</>}
                </div>
              </WithdrawContext.Provider>
            </FastPayContext.Provider>
          </FollowersContext.Provider>
        </AccountingContext.Provider>
      </AppContext.Provider>
    </>
  );
};

export default WildPay;
