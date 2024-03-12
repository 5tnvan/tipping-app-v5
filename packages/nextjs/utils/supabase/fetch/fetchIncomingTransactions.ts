"use client";

import { gql, useQuery } from "@apollo/client";

/**
 * FETCH: fetchIncomingTransactions()
 * DB: subpgraph
 * TABLE: "tips"
 * RETURN: { incomingTransactionsData }
 **/

export const useIncomingTransactions = receiverAddress => {
  const TIPS_GRAPHQL = `
    query GetTips($receiverAddress: Bytes!) {
      tips(
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
  const {
    data: incomingTransactionsData,
    error,
    refetch,
  } = useQuery(TIPS_GQL, {
    variables: { receiverAddress },
    fetchPolicy: "network-only",
  });

  if (error) {
    console.log("fetchIncomingTransactions() error");
  }

  return incomingTransactionsData;
};
