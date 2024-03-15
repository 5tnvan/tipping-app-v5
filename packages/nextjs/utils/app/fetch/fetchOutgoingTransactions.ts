"use client";

import { gql, useQuery } from "@apollo/client";

/**
 * FETCH: fetchOutgoingTransactions()
 * DB: subpgraph
 * TABLE: "payments"
 * RETURN: { outgoingTransactionsData }
 **/

export const useOutgoingTransactions = senderAddress => {
  const PAYMENTS_GRAPHQL = `
      query GetPayments($senderAddress: Bytes!) {
        payments(
          where: { sender: $senderAddress }
          orderBy: createdAt
          orderDirection: desc
        ) {
          id
          sender
          receiver
          message
          value
          fee
          createdAt
          transactionHash
        }
      }
    `;

  const PAYMENTS_GQL = gql(PAYMENTS_GRAPHQL);
  const {
    data: outgoingTransactionsData,
    error,
    refetch,
  } = useQuery(PAYMENTS_GQL, {
    variables: { senderAddress },
    fetchPolicy: "network-only",
  });

  if (error) {
    //console.log("fetchOutgoingTransactions() error");
  }

  return outgoingTransactionsData;
};
