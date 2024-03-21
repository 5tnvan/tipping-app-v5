import { useContext } from "react";
import { useParams } from "next/navigation";
import { AppContext } from "./context";
import IsPublicLayout from "./isPublicLayout";
import { IsNotAuthMenu } from "~~/components/app/authentication/IsNotAuthMenu";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Profile",
  description: "Profile",
});

const IsNotAuth = ({ children }: { children: React.ReactNode }) => {
  const { username } = useParams();
  const { isLoadingAuth } = useContext(AppContext);

  const nothing = () => {
    console.log("nothing");
  };

  return (
    <>
      {/* ISNOTAUTH MENU DROPDOWN */}
      {isLoadingAuth ? (
        <>
          <div className="z-10 wildui-menu absolute">
            <div
              tabIndex={0}
              role="button"
              className="custom-is-not-auth-menu w-24 absolute btn btn-neutral z-20"
            ></div>
          </div>
        </>
      ) : (
        <IsNotAuthMenu />
      )}

      {/* ISNOTAUTH CHILDREN */}
      {username && <IsPublicLayout onSuccess={nothing}>{children}</IsPublicLayout>}
      {!username && (
        <div id="wildpay-is-not-auth" className="flex flex-col grow pr-6 pl-6">
          {children}
        </div>
      )}
    </>
  );
};

export default IsNotAuth;
