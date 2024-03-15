"use client";

import { useEffect, useState } from "react";

export const useProfilePay = () => {
  const [profilePaySuccess, setProfilePaySuccess] = useState<boolean>(false);

  useEffect(() => {
    const initFastPay = async () => {
      if (profilePaySuccess) {
        setProfilePaySuccess(false);
        console.log("useProfilePay: profilePaySuccess ", profilePaySuccess);
      }
    };

    initFastPay();
  }, [profilePaySuccess, setProfilePaySuccess]);

  return { profilePaySuccess, setProfilePaySuccess };
};
