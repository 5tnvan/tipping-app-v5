"use client";

import { AccountingContext, AppContext, FastPayContext, FollowersContext } from "./context";
import IsAuthLayout from "./isAuthLayout";
import IsNotAuthLayout from "./isNotAuthLayout";
import { useAccounting } from "~~/hooks/app/useAccounting";
import { useAuthentication } from "~~/hooks/app/useAuthentication";
import { useFastPay } from "~~/hooks/app/useFastPay";
import { useFollowers } from "~~/hooks/app/useFollowers";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const WildPay = ({ children }: { children: React.ReactNode }) => {
  const { isLoading: isLoadingAuth, isAuth, user, profile, refetch: refetchAuth } = useAuthentication();
  const { isLoading: isLoadingFollowers, followersData, refetch: refetchFollowers } = useFollowers(profile.id);
  const {
    incomingTx,
    incomingTxSum,
    outgoingTx,
    outgoingTxSum,
    refetch: refetchAccounting,
  } = useAccounting(profile.wallet_id);
  const { fastPaySuccess, setFastPaySuccess } = useFastPay();

  const bgClass = isAuth === "yes" ? "bg-slate-100" : isAuth === "no" ? "custom-gradient-02" : "";

  return (
    <>
      <AppContext.Provider value={{ isLoadingAuth, isAuth, user, profile, refetchAuth }}>
        <div id="wildpay" className={`flex flex-col ${bgClass} relative z-10 rounded-t-2xl`}>
          <div id="wildpay-logo" className="flex items-center z-10 ml-7 mt-7">
            <img className="z-10" src="/wildpay-logo.svg" width={30} height={30}></img>
            <h1 className="font-semibold custom-text-blue ml-2 z-10">wildpay</h1>
          </div>
          <AccountingContext.Provider
            value={{ incomingTx, incomingTxSum, outgoingTx, outgoingTxSum, refetchAccounting }}
          >
            <FollowersContext.Provider value={{ isLoadingFollowers, followersData, refetchFollowers }}>
              <FastPayContext.Provider value={{ fastPaySuccess, setFastPaySuccess }}>
                {isAuth == "yes" && <IsAuthLayout>{children}</IsAuthLayout>}
                {isAuth == "no" && <IsNotAuthLayout>{children}</IsNotAuthLayout>}
              </FastPayContext.Provider>
            </FollowersContext.Provider>
          </AccountingContext.Provider>
        </div>
      </AppContext.Provider>
    </>
  );
};

export default WildPay;
