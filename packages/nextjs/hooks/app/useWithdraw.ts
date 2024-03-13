"use client";

import { useEffect, useState } from "react";

export const useWithdraw = () => {
  const [withdrawSuccess, setWithdrawSuccess] = useState<boolean>(false);

  useEffect(() => {
    const initFastPay = async () => {
      if (withdrawSuccess) setWithdrawSuccess(false);
    };

    initFastPay();
  }, [withdrawSuccess, setWithdrawSuccess]);

  return { withdrawSuccess, setWithdrawSuccess };
};