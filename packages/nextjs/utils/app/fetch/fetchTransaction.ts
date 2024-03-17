"use client";

import { gql, useQuery } from "@apollo/client";

/**
 * FETCH: fetchOutgoingTransactions()
 * DB: subpgraph
 * TABLE: "payments"
 * RETURN: { outgoingTransactionsData }
 **/

export const useFetchTransaction = (hash: any) => {
  console.log("useFetchTransaction hash", hash);
  const PAYMENTS_GRAPHQL = `
      query GetPayments($hash: String!) {
        payments(
          where: { transactionHash: $hash }
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
    data: transactionData,
    loading,
    error,
  } = useQuery(PAYMENTS_GQL, {
    variables: { hash },
    fetchPolicy: "network-only",
  });

  if (error) {
    console.log("useTransaction() error: ", error);
  }

  return { transactionData, loading };
};
