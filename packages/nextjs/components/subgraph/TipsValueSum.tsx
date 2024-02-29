"use client";

import { gql, useQuery } from "@apollo/client";
import { formatEther } from "viem";

const TipsValueSum = ({ receiverAddress }) => {
    const TIPS_GRAPHQL = `
    query GetTips($receiverAddress: Bytes!) {
      tips(
        first: 25
        where: { receiver: $receiverAddress }
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
    variables: { receiverAddress },
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

  const totalSumEth = formatEther(totalSum);

  return (
    <>
      <span>{totalSumEth}</span>
    </>
  );
};

export default TipsValueSum;