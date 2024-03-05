import React from "react";
import { logout } from "~~/app/login/actions";
import { LoginIcon } from "~~/components/assets/LoginIcon";
import { useAuthentication } from "~~/hooks/app/useAuthentication";

export const IsAuthMenu = ({ profile }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div id="wildpay-is-auth-menu" className="dropdown dropdown-end z-10 custom-is-auth-menu absolute">
        <div tabIndex={0} role="button" className="btn m-1 btn-primary">
          <LoginIcon />
          {profile.username}
        </div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>

      {/* {isAuth === "no" && (
        <div className="btn btn-primary z-10 custom-is-auth-menu">
          <a href="login" className="flex items-center">
            <LoginIcon />
            <div className="ml-1">Login</div>
          </a>
        </div>
      )} */}
    </>
  );
};
