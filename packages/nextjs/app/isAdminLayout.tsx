import { useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { AppContext } from "./context";
import IsPublicLayout from "./isPublicLayout";
import { IsNotAuthMenu } from "~~/components/app/authentication/IsNotAuthMenu";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Admin",
  description: "Admin",
});

const IsAdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuth, profile } = useContext(AppContext);
  const router = useRouter();

  if (isAuth) {
    if (profile.username == "micalabs") {
      return (
        <>
          <div className="bg-neutral-300 flex flex-col justify-center items-center">
            <div className="flex mt-10">
              <button className="btn btn-sm btn-primary mr-3" onClick={() => router.back()}>
                Back
              </button>
              <h1 className="text-primary text-2xl">Welcome, Admin</h1>
            </div>

            {children}
          </div>
        </>
      );
    }
  } else {
    return "you are not an admin";
  }
};

export default IsAdminLayout;
