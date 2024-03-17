"use client";

import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { useFetchBalance } from "~~/utils/app/fetch/fetchBalance";
import { useIncomingTransactions } from "~~/utils/app/fetch/fetchIncomingTransactions";
import { useOutgoingTransactions } from "~~/utils/app/fetch/fetchOutgoingTransactions";

export const useAccounting = (wallet_id: any) => {
  const [dummyWallet, setDummyWallet] = useState("0x93814dC4F774f719719CAFC9C9E7368cb343Bd0E");
  const [withdrawBalance, setWithdrawBalance] = useState<any>();
  const [incomingTx, setIncomingTx] = useState<any>(null);
  const [incomingTxSum, setIncomingTxSum] = useState(0);
  const [outgoingTx, setOutgoingTx] = useState<any>(null);
  const [outgoingTxSum, setOutgoingTxSum] = useState(0);
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const incomingTransactionsData = useIncomingTransactions(wallet_id);
  const outgoingTransactionsData = useOutgoingTransactions(wallet_id);
  const res = useFetchBalance(dummyWallet);

  const calculateSum = (txData: any) => {
    const totalSum =
      txData?.payments?.reduce((sum: number, payment: { value: any }) => {
        return sum + Number(payment.value);
      }, 0) || 0;

    const totalSumEth = Number(Number(formatEther(totalSum)).toFixed(4));
    return totalSumEth;
  };

  const initAccounting = async () => {
    if (wallet_id) {
      //withdraw balance
      setDummyWallet(wallet_id);
      setWithdrawBalance(res);
      //incoming
      setIncomingTx(incomingTransactionsData);
      setIncomingTxSum(calculateSum(incomingTx));
      //outgoing
      setOutgoingTx(outgoingTransactionsData);
      setOutgoingTxSum(calculateSum(outgoingTx));
    }
  };

  const refetch = () => {
    console.log("accounting refresh triggered");
    setTriggerRefetch(prev => !prev);
  };

  useEffect(() => {
    initAccounting();
  }, [incomingTransactionsData, incomingTx, outgoingTransactionsData, outgoingTx, wallet_id, triggerRefetch]);

  return { withdrawBalance, incomingTx, incomingTxSum, outgoingTx, outgoingTxSum, refetch };
};
