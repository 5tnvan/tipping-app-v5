"use client";

import React from "react";
import { useRouter } from "next/navigation";
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
          <pre>@{profile.username}</pre>
        </div>
      </>
    );
  }
};
export default PrivatePage;
