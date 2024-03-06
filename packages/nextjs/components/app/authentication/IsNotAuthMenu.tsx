import Link from "next/link";
import React from "react";
import { logout } from "~~/app/login/actions";
import { LoginIcon } from "~~/components/assets/LoginIcon";
import { useAuthentication } from "~~/hooks/app/useAuthentication";

export const IsNotAuthMenu = () => {

  return (
    <>
      <div className="btn btn-primary z-20 custom-is-auth-menu absolute">
        <Link href="login" className="flex items-center">
          <LoginIcon />
          <div className="ml-1">Login</div>
        </Link>
      </div>
    </>
  );
};
