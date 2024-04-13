import { useContext } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { AppContext } from "./context";
import IsPublicLayout from "./isPublicLayout";
import { IsNotAuthMenu } from "~~/components/app/authentication/IsNotAuthMenu";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const IsNotAuth = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isTransaction = pathname.includes("/transaction");
  const { username } = useParams();
  const { isLoadingAuth } = useContext(AppContext);

  return (
    <>
      {/* ISNOTAUTH MENU DROPDOWN */}
      {isLoadingAuth && <div className="custom-is-not-auth-menu w-24 absolute btn btn-neutral z-20"></div>}
      {!isLoadingAuth && <IsNotAuthMenu />}
      {/* ISNOTAUTH: /username */}
      {username && (
        <>
          <IsPublicLayout>{children}</IsPublicLayout>
          <Link
            href="/login"
            id="wildpay-app-menu"
            className="flex justify-around absolute bottom-0 text-white items-center custom-bg-blue w-full h-14 z-40"
          >
            Login
          </Link>
        </>
      )}
      {/* ISNOTAUTH: /transaction */}
      {isTransaction && (
        <>
          <div id="wildpay-is-not-auth" className="bg-white">
            <div className="custom-top-cover absolute z-0 h-100px"></div>
            {children}
            <Link
              href="/login"
              id="wildpay-app-menu"
              className="flex justify-around absolute bottom-0 text-white items-center custom-bg-blue w-full h-14 z-40"
            >
              Login
            </Link>
          </div>
        </>
      )}
      {/* ISNOTAUTH: /getstarted, /login, /signup/verify */}
      {!username && !isTransaction && (
        <>
          <div id="wildpay-is-not-auth" className="flex flex-col grow">
            {children}
          </div>
        </>
      )}
    </>
  );
};

export default IsNotAuth;
