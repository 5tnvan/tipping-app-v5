import { useContext } from "react";
import { AppContext } from "./context";
import { IsNotAuthMenu } from "~~/components/app/authentication/IsNotAuthMenu";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const IsNotAuth = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuth, user, profile, refetch } = useContext(AppContext);

  return (
    <>
      {/* USER MENU BAR */}
      {isLoading ? (
        <>
          <div className="z-10 custom-is-auth-menu absolute">
            <div tabIndex={0} role="button" className="btn m-1 btn-primary bg-slate-300 animate-pulse w-24"></div>
          </div>
        </>
      ) : (
        <IsNotAuthMenu />
      )}
      <div id="wildpay-is-not-auth" className="flex flex-col grow pr-7 pl-7">
        {/* <div className="custom-bg-auth absolute z-0 rounded-t-2xl"></div> */}
        {/* <div id="wildpay-is-not-auth-top" className="relative z-10 pt-20"></div> */}
        {children}
      </div>
    </>
  );
};

export default IsNotAuth;
