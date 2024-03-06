import { useContext } from "react";
import AppContext from "./context";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const IsNotAuth = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isAuth, user, profile } = useContext(AppContext);

  return (
    <>
      <div id="wildpay-is-not-auth" className="custom-gradient-02 h-full pr-7 pl-7">
        {/* <div className="custom-auth-bg absolute z-0 rounded-t-2xl"></div> */}
        {/* <div id="wildpay-is-not-auth-top" className="relative z-10 pt-20"></div> */}
        {children}
      </div>
    </>
  );
};

export default IsNotAuth;
