"use client";

import { gql, useQuery } from "@apollo/client";
import { formatEther } from "viem";

const PayOutgoingTransactionsSum = ({ senderAddress }) => {
  if (!senderAddress) {
    return (
      <>
        <span>0</span>
      </>
    );
  }

  const TIPS_GRAPHQL = `
    query GetTips($senderAddress: Bytes!) {
      tips(
        where: { sender: $senderAddress }
        orderBy: createdAt
        orderDirection: desc
      ) {
        id
        sender
        receiver
        greeting
        value
        fee
        createdAt
        transactionHash
      }
    }
  `;
  const TIPS_GQL = gql(TIPS_GRAPHQL);
  const { data: tipsData, error } = useQuery(TIPS_GQL, {
    variables: { senderAddress },
    fetchPolicy: "network-only",
  });

  // Subgraph maybe not yet configured
  if (error) {
    console.log(error);
    return <></>;
  }

  // Calculate total sum of 'value'
  const totalSum =
    tipsData?.tips?.reduce((sum, tip) => {
      return sum + Number(tip.value);
    }, 0) || 0;

  const totalSumEth = Number(formatEther(totalSum)).toFixed(4);

  return (
    <>
      <span>{totalSumEth}</span>
    </>
  );
};

export default PayOutgoingTransactionsSum;
