import React from "react";
import Link from "next/link";

export const IsNotAuthMenu = () => {
  return (
    <>
      <Link href="/login" className="custom-is-not-auth-menu w-24 absolute btn btn-neutral z-20">
        Login
      </Link>
    </>
  );
};
