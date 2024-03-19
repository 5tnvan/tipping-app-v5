import React from "react";
import Link from "next/link";

export const IsNotAuthMenu = () => {
  return (
    <>
      <Link
        href="/login"
        className="custom-is-not-auth-menu absolute btn px-8 py-2 bg-slate-100 text-black rounded-md transition duration-100 ease-linear"
      >
        Login
      </Link>
    </>
  );
};
