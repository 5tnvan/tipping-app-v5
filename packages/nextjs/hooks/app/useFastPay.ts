"use client";

import { useEffect, useState } from "react";

export const useFastPay = () => {
  const [fastPaySuccess, setFastPaySuccess] = useState<boolean>(false);

  useEffect(() => {
    const initFastPay = async () => {
      if (fastPaySuccess) setFastPaySuccess(false);
    };

    initFastPay();
  }, [fastPaySuccess, setFastPaySuccess]);

  return { fastPaySuccess, setFastPaySuccess };
};
