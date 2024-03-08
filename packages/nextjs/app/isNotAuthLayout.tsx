import { useContext } from "react";
import { useParams } from "next/navigation";
import { AppContext, PublicContext } from "./context";
import IsPublicLayout from "./isPublicLayout";
import { IsNotAuthMenu } from "~~/components/app/authentication/IsNotAuthMenu";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const IsNotAuth = ({ children }: { children: React.ReactNode }) => {
  const { username } = useParams();
  const { isLoadingAuth, isAuth, user, profile, refetchAuth } = useContext(AppContext);
  const { isLoadingPublic, publicProfile, refetchPublic } = useContext(PublicContext);

  return (
    <>
      {/* ISNOTAUTH MENU DROPDOWN */}
      {isLoadingAuth ? (
        <>
          <div className="z-10 custom-is-auth-menu absolute">
            <div tabIndex={0} role="button" className="btn m-1 btn-primary bg-slate-300 animate-pulse w-24"></div>
          </div>
        </>
      ) : (
        <IsNotAuthMenu />
      )}

      {/* ISNOTAUTH CHILDREN */}
      {username && <IsPublicLayout>{children}</IsPublicLayout>}
      {!username && (
        <div id="wildpay-is-not-auth" className="flex flex-col grow pr-7 pl-7">
          {children}
        </div>
      )}
    </>
  );
};

export default IsNotAuth;
