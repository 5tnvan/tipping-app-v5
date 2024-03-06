import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "~~/app/login/actions";
import { LoginIcon } from "~~/components/assets/LoginIcon";

export const IsAuthMenu = ({ profile, refetch }) => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    refetch();
  };

  return (
    <>
      <div id="wildpay-is-auth-menu" className="dropdown dropdown-end z-20 custom-is-auth-menu absolute">
        <div tabIndex={0} role="button" className="btn m-1 btn-primary">
          <LoginIcon />
          {profile.username}
        </div>
        <ul tabIndex={0} className="dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <div onClick={() => router.push("/profile/view")}>My Profile</div>
          </li>
          <li>
            <div onClick={() => router.push("/settings")}>My Settings</div>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </>
  );
};
