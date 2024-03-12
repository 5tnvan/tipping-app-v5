"use client";

import { useEffect, useState } from "react";

export const useFastPay = () => {
  const [fastPaySuccess, setFastPaySuccess] = useState<boolean>();
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const refetch = () => {
    setTriggerRefetch(prev => !prev);
  };

  useEffect(() => {
    const initFastPay = async () => {
      setFastPaySuccess(false);
    };

    initFastPay();
  }, [triggerRefetch]);

  return { fastPaySuccess, setFastPaySuccess, refetch };
};
