"use client";

import { formatEther } from "viem";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";

/**
 * FETCH: useFetchBalance()
 * DB: subpgraph
 * TABLE: "payments"
 * RETURN: formatEther(balanceInGwei)
 **/

export const useFetchBalance = (wallet_id: any) => {
  const { data: balance, error } = useScaffoldContractRead({
    contractName: "WildpayEthContract",
    functionName: "amountsReceived",
    args: [wallet_id],
    watch: true,
  });

  if (error) {
    console.log("useFetchBalance error", error);
  }

  // Use nullish coalescing to handle the case where balance is null
  const balanceInGwei = balance ?? 0n;

  // Convert Gwei to Ether
  return formatEther(balanceInGwei);
};
