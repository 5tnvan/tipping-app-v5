import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "./context";
import { FaucetButton } from "~~/components/scaffold-eth";
import { RainbowKitCustomConnectButtonForAdmin } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton/admin";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Admin",
  description: "Admin",
});

const IsAdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuth, profile } = useContext(AuthUserContext);
  const router = useRouter();

  if (isAuth) {
    if (profile?.username == "micalabs") {
      return (
        <>
          <div className="bg-neutral-300 flex flex-col justify-center items-center">
            <div className="flex mt-10 justify-between pl-6 pr-6 w-full">
              <button className="btn btn-sm btn-primary mr-3" onClick={() => router.back()}>
                Back
              </button>
              <h1 className="text-primary text-2xl mr-2">Welcome, Admin</h1>
              <div className="flex">
                <RainbowKitCustomConnectButtonForAdmin btn="small" />
                <FaucetButton />
              </div>
            </div>

            {children}
          </div>
        </>
      );
    } else {
      return "you are not an admin";
    }
  } else {
    return "you are not an admin";
  }
};

export default IsAdminLayout;
