import React from "react";
import { logout } from "~~/app/login/actions";
import { LoginIcon } from "~~/components/assets/LoginIcon";
import { useAuthentication } from "~~/hooks/app/useAuthentication";

export const IsAuthMenu = () => {
  const { isAuth, profile, refetch } = useAuthentication();

  const handleLogout = () => {
    logout();
    refetch();
  };

  return (
    <>
      {isAuth === "yes" && (
        <div className="dropdown dropdown-end z-10 absolute custom-is-auth-menu">
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
      )}

      {isAuth === "no" && (
        <div className="btn btn-primary z-10 absolute custom-is-auth-menu">
          <a href="login" className="flex items-center">
            <LoginIcon />
            <div className="ml-1">Login</div>
          </a>
        </div>
      )}
    </>
  );
};
