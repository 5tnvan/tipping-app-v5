"use client";

import { useParams } from "next/navigation";
import { AppContext } from "./context";
import IsAuthLayout from "./isAuthLayout";
import IsNotAuthLayout from "./isNotAuthLayout";
import IsPublicLayout from "./isPublicLayout";
import { useAuthentication } from "~~/hooks/app/useAuthentication";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const WildPay = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuth, user, profile, refetch } = useAuthentication();
  const { username } = useParams();

  const bgClass = username
    ? "bg-slate-100"
    : isAuth === "yes"
    ? "bg-slate-100"
    : isAuth === "no"
    ? "custom-gradient-02"
    : "";

  return (
    <>
      <AppContext.Provider value={{ isLoading, isAuth, user, profile, refetch }}>
        <div id="wildpay" className={`flex flex-col ${bgClass} relative z-10 rounded-t-2xl`}>
          <div id="wildpay-logo" className="flex items-center z-10 ml-7 mt-7">
            <img className="z-10" src="/wildpay-logo.svg" width={30} height={30}></img>
            <h1 className="font-semibold custom-text-blue ml-2 z-10">wildpay</h1>
          </div>
          {username && <IsPublicLayout username={username}>{children}</IsPublicLayout>}
          {!username && isAuth == "yes" && <IsAuthLayout>{children}</IsAuthLayout>}
          {!username && isAuth == "no" && <IsNotAuthLayout>{children}</IsNotAuthLayout>}
        </div>
      </AppContext.Provider>
    </>
  );
};

export default WildPay;
