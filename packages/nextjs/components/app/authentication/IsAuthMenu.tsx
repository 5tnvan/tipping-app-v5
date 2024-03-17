import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "~~/app/context";
import { logout } from "~~/app/login/actions";
import { LoginIcon } from "~~/components/assets/LoginIcon";

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
        <summary className="m-1 btn btn-primary">
          <LoginIcon />
          {profile.username}
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
