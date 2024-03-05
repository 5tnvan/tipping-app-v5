"use client";

import { gql, useQuery } from "@apollo/client";
import { formatEther } from "viem";

const TipsValueSum = ({ receiverAddress }) => {
  if (!receiverAddress) {
    return (
      <>
        <span>0</span>
      </>
    );
  }

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

  // isLoading
  // if (isLoading) {
  //   return (
  //     <>
  //       <div className="animate-pulse">
  //         <div className="rounded-md bg-slate-300 h-6 w-6"></div>
  //       </div>
  //     </>
  //   );
  // }

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
