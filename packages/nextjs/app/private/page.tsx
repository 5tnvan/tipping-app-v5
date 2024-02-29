"use client";

import React from "react";
import { logout } from "../login/actions";
import { NextPage } from "next";
import { useAuthenticationWithProfileInit } from "~~/hooks/app/useAuthentication";

const PrivatePage: NextPage = () => {
  const { isLogin, profile } = useAuthenticationWithProfileInit();

  // if (isLogin == "init") {
  //   return null;
  // }

  if (isLogin == "loggedin") {
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
