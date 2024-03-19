import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "./Avatar";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { AppContext } from "~~/app/context";
import { logout } from "~~/app/login/actions";

type Props = {
  refetch: any;
};

export const IsAuthMenu = ({ refetch }: Props) => {
  const router = useRouter();

  const { profile } = useContext(AppContext);

  const handleMenu = () => {
    const dropdown = document.getElementById("wildpay-is-auth-menu");
    dropdown?.removeAttribute("open");
  };

  const handleLogout = async () => {
    try {
      await logout();
      refetch();
    } catch (error) {
      console.error("Logout error:", error);
      router.push("error");
    }
  };

  return (
    <>
      <details id="wildpay-is-auth-menu" className="dropdown z-20 custom-is-auth-menu absolute dropdown-end">
        <summary className="m-1 px-6 py-2 btn bg-slate-100 text-black">
          <Avatar profile={profile} width="8" ring={false} />
          <ChevronDownIcon width={12} />
        </summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li>
            <div
              onClick={() => {
                router.push("/profile/view");
                handleMenu();
              }}
            >
              My Profile
            </div>
          </li>
          <li>
            <div
              onClick={() => {
                router.push("/settings");
                handleMenu();
              }}
            >
              My Settings
            </div>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </details>
    </>
  );
};
