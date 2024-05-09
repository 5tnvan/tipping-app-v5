import { useContext, useEffect } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import UserIntroLayout from "./UserIntroLayout";
import { AuthContext } from "./context";
import { IsNotAuthMenu } from "~~/components/app/authentication/IsNotAuthMenu";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "NotAuthUserLayout",
  description: "NotAuthUserLayout",
});

/**
 * NOTAUTHUSERLAYOUT
 * Layout for user's that are not logged in
 **/
const NotAuthUserLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  /* CONSUME CONTEXT */
  const { isAuthenticated } = useContext(AuthContext);

  /* CHECK ROUTES */
  const { username } = useParams();
  const pathname = usePathname();
  const isGetStarted = pathname.includes("/getstarted");
  const isLogin = pathname.includes("/login");
  const isSignUpNew = pathname == "/signup/new";
  const isSignUpVerify = pathname == "/signup/verify";
  const isTransaction = pathname.includes("/transaction");
  const isLeaderboard = pathname === "/leaderboard";
  const isBios = pathname === "/bios";

  /*
   * REDIRECT
   * If user is not authenticated and visits these pages, redirect to index
   */
  const isHome = pathname === "/home";
  const isProfile = pathname.includes("/profile");
  const isSettings = pathname.includes("/settings");
  const isLevels = pathname === "/levels";
  const isNotification = pathname === "/notifications";

  useEffect(() => {
    if (isAuthenticated === "no" && (isProfile || isSettings || isLevels || isNotification)) {
      router.push("/");
    }
  }, [isAuthenticated, isHome, isProfile, isSettings, isLevels, isNotification, router]);

  return (
    <>
      {/*
       * NOTAUTHUSER DROPDOWN
       * The dropdown menu on right top corner
       */}
      {isAuthenticated == "init" && <div className="custom-is-not-auth-menu w-24 absolute btn btn-neutral z-20"></div>}
      {isAuthenticated == "no" && <IsNotAuthMenu />}

      {/*
       * NOTAUTHUSER
       * /[username]
       */}
      {username && (
        <>
          <UserIntroLayout>{children}</UserIntroLayout>
          <Link
            href="/login"
            id="wildpay-app-menu"
            className="flex justify-around absolute bottom-0 text-white items-center custom-bg-blue w-full h-14 z-40"
          >
            Login
          </Link>
        </>
      )}

      {/*
       * NOTAUTHUSER
       * /transaction
       */}
      {isTransaction && (
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
      )}

      {/* NOTAUTHUSER:
       * /getstarted
       * /login
       * /signup/new
       * /signup/verify
       */}
      {(isGetStarted || isLogin || isSignUpNew || isSignUpVerify || isLeaderboard || isBios ) && (
        <div id="wildpay-is-not-auth" className="flex flex-col grow">
          {children}
        </div>
      )}
    </>
  );
};

export default NotAuthUserLayout;
