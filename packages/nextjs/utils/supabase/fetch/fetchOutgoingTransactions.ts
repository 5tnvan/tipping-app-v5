"use client";

import { gql, useQuery } from "@apollo/client";

/**
 * FETCH: fetchOutgoingTransactions()
 * DB: subpgraph
 * TABLE: "tips"
 * RETURN: { outgoingTransactionsData }
 **/

export const useOutgoingTransactions = senderAddress => {
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
  
  const {
    data: outgoingTransactionsData,
    error,
    refetch,
  } = useQuery(TIPS_GQL, {
    variables: { senderAddress },
    fetchPolicy: "network-only",
  });

  if (error) {
    console.log("fetchOutgoingTransactions() error");
  }

  return outgoingTransactionsData;
};
