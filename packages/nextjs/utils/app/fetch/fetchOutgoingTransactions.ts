"use client";

import { gql, useQuery } from "@apollo/client";

/**
 * FETCH: fetchOutgoingTransactions()
 * DB: subpgraph
 * TABLE: "payments"
 * RETURN: { outgoingTransactionsData }
 **/

export const useOutgoingTransactions = (senderAddress: any) => {
  const PAYMENTS_GRAPHQL = `
      query GetPayments($senderAddress: Bytes!) {
        paymentChanges(
          where: { sender: $senderAddress }
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
  const { data: outgoingTransactionsData, error } = useQuery(PAYMENTS_GQL, {
    variables: { senderAddress },
    fetchPolicy: "network-only",
  });

  if (error) {
    //console.log("fetchOutgoingTransactions() error");
  }

  return outgoingTransactionsData;
};
