import React from "react";
import { useRouter } from "next/navigation";
import { LoginIcon } from "~~/components/assets/LoginIcon";

export const IsNotAuthMenu = () => {
  const router = useRouter();
  return (
    <>
      <div className="btn btn-primary z-20 custom-is-auth-menu absolute">
        <div className="flex items-center" onClick={() => router.push("/settings")}>
          <LoginIcon />
          <div className="ml-1">Login</div>
        </div>
      </div>
    </>
  );
};
