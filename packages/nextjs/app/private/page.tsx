"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { logout } from "../login/actions";
import { NextPage } from "next";
import { useAuthentication } from "~~/hooks/app/useAuthentication";

const PrivatePage: NextPage = () => {
  const router = useRouter();
  const { isAuth, profile } = useAuthentication();
  if (isAuth == "no") {
    router.push("/login");
  }
  if (isAuth == "yes") {
    return (
      <>
        <div>
          <p>Your Profile:</p>
          <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
        <form>
          <button formAction={logout}>Logout</button>
        </form>
      </>
    );
  }
};
export default PrivatePage;
