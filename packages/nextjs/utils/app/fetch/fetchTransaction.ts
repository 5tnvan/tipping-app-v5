"use client";

import { ApolloClient, HttpLink, InMemoryCache, gql, useQuery } from "@apollo/client";

// Define your Apollo Client instances for each endpoint
const apolloClientEthereum = new ApolloClient({
  link: new HttpLink({ uri: "https://api.studio.thegraph.com/query/68297/wildpay-sepolia-v4/0.0.1" }),
  cache: new InMemoryCache(),
});

const apolloClientBase = new ApolloClient({
  link: new HttpLink({ uri: "https://api.studio.thegraph.com/query/68297/wildpay-base-sepolia/0.0.1" }),
  cache: new InMemoryCache(),
});

/**
 * FETCH: useFetchPayment()
 * DB: subpgraph
 * TABLE: "paymentChanges"
 * RETURN: { paymentChanges }
 **/

export const useFetchPayment = (hash: any, network: any) => {
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
    data: paymentData,
    loading,
    error,
  } = useQuery(PAYMENTS_GQL, {
    variables: { hash },
    fetchPolicy: "network-only",
    client: network == "ethereum" ? apolloClientEthereum : apolloClientBase,
  });

  if (error) {
    console.log("error: ", error);
  }

  return { paymentData, loading, error };
};

/**
 * FETCH: useFetchWithdraw()
 * DB: subpgraph
 * TABLE: "withdrawChanges"
 * RETURN: { paymentChanges }
 **/

export const useFetchWithdraw = (hash: any, network: any) => {
  const PAYMENTS_GRAPHQL = `
      query GetWithdraws($hash: String!) {
        withdrawChanges(
          where: { transactionHash: $hash }
          orderBy: blockTimestamp
          orderDirection: desc
        ) {
          id
          wallet
          value
          blockNumber
          blockTimestamp
          transactionHash
        }
      }
    `;

  const PAYMENTS_GQL = gql(PAYMENTS_GRAPHQL);
  const {
    data: withdrawData,
    loading,
    error,
  } = useQuery(PAYMENTS_GQL, {
    variables: { hash },
    fetchPolicy: "network-only",
    client: network == "ethereum" ? apolloClientEthereum : apolloClientBase,
  });

  if (error) {
    console.log("error: ", error);
  }

  return { withdrawData, loading, error };
};
