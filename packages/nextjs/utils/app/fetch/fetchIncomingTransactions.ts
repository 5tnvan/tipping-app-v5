"use client";

import { gql, useQuery } from "@apollo/client";

/**
 * FETCH: fetchIncomingTransactions()
 * DB: subpgraph
 * TABLE: "payments"
 * RETURN: { incomingTransactionsData }
 **/

export const useIncomingTransactions = (receiverAddress: any) => {
  const PAYMENTS_GRAPHQL = `
    query GetPayments($receiverAddress: Bytes!) {
      payments(
        where: { receiver: $receiverAddress }
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
  const { data: incomingTransactionsData, error } = useQuery(PAYMENTS_GQL, {
    variables: { receiverAddress },
    fetchPolicy: "network-only",
  });

  if (error) {
    //console.log("fetchIncomingTransactions() error");
  }

  return incomingTransactionsData;
};
