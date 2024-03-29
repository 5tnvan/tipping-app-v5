"use client";

import { gql, useQuery } from "@apollo/client";

/**
 * FETCH: useFetchTransaction()
 * DB: subpgraph
 * TABLE: "paymentChanges"
 * RETURN: { paymentChanges }
 **/

export const useFetchTransaction = (hash: any) => {
  const PAYMENTS_GRAPHQL = `
      query GetPayments($hash: String!) {
        paymentChanges(
          where: { transactionHash: $hash }
          orderBy: blockTimestamp
          orderDirection: desc
        ) {
          id
          sender
          receiver
          newMessage
          value
          fee
          blockNumber
          blockTimestamp
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

  console.log("useFetchTransaction");

  if (error) {
    console.log("useTransaction() error: ", error);
  }

  return { transactionData, loading, error };
};
