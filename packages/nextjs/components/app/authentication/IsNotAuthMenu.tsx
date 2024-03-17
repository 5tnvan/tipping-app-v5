import React from "react";
import Link from "next/link";
import { LoginIcon } from "~~/components/assets/LoginIcon";

export const IsNotAuthMenu = () => {
  return (
    <>
      <Link href="/login" className="btn btn-primary z-20 custom-is-auth-menu absolute">
        <div className="flex items-center">
          <LoginIcon />
          <div className="ml-1">Login</div>
        </div>
      </Link>
    </>
  );
};
