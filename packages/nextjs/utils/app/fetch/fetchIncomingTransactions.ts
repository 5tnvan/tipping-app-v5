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
    query GetPaymentChanges($receiverAddress: Bytes!) {
      paymentChanges(
        where: { receiver: $receiverAddress }
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
  const { data: incomingTransactionsData, error } = useQuery(PAYMENTS_GQL, {
    variables: { receiverAddress },
    fetchPolicy: "network-only",
  });

  if (error) {
    //console.log("fetchIncomingTransactions() error");
  }

  console.log(incomingTransactionsData);

  return incomingTransactionsData;
};
