"use client";

import { formatEther, parseGwei } from "viem";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";

/**
 * FETCH: useFetchBalance()
 * DB: subpgraph
 * TABLE: "payments"
 * RETURN: formatEther(balanceInGwei)
 **/

export const useFetchBalance = wallet_id => {
  const { data: balance, error } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "amountsReceived",
    args: [wallet_id],
  });

  if (error) {
    console.log("useFetchBalance error", error);
  }

  // Use nullish coalescing to handle the case where balance is null
  const balanceInGwei = balance ?? 0n;

  // Convert Gwei to Ether
  return formatEther(balanceInGwei);
};
