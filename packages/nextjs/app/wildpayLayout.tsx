"use client";

import { useParams } from "next/navigation";
import { AppContext, PublicContext } from "./context";
import IsAuthLayout from "./isAuthLayout";
import IsNotAuthLayout from "./isNotAuthLayout";
import { useAuthentication } from "~~/hooks/app/useAuthentication";
import { usePublicProfile } from "~~/hooks/app/usePublicProfile";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const WildPay = ({ children }: { children: React.ReactNode }) => {
  const { username } = useParams();
  const { isLoading: isLoadingAuth, isAuth, user, profile, refetch: refetchAuth } = useAuthentication();
  const { isLoading: isLoadingPublic, publicProfile, refetch: refetchPublic } = usePublicProfile(username);
  const bgClass = isAuth === "yes" ? "bg-slate-100" : isAuth === "no" ? "custom-gradient-02" : "";

  return (
    <>
      <AppContext.Provider value={{ isLoadingAuth, isAuth, user, profile, refetchAuth }}>
        <div id="wildpay" className={`flex flex-col ${bgClass} relative z-10 rounded-t-2xl`}>
          <div id="wildpay-logo" className="flex items-center z-10 ml-7 mt-7">
            <img className="z-10" src="/wildpay-logo.svg" width={30} height={30}></img>
            <h1 className="font-semibold custom-text-blue ml-2 z-10">wildpay</h1>
          </div>
          <PublicContext.Provider value={{ isLoadingPublic, publicProfile, refetchPublic }}>
            {isAuth == "yes" && <IsAuthLayout>{children}</IsAuthLayout>}
            {isAuth == "no" && <IsNotAuthLayout>{children}</IsNotAuthLayout>}
          </PublicContext.Provider>
        </div>
      </AppContext.Provider>
    </>
  );
};

export default WildPay;
