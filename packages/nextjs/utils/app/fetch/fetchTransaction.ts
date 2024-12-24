"use client";

import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";

const apolloClientEthereum = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/68297/wildpay-eth-mainnet/0.0.1",
  cache: new InMemoryCache(),
});

const apolloClientBase = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/68297/wildpay-base-mainnet/0.0.1",
  cache: new InMemoryCache(),
});

const apolloClientFuse = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/68297/wildpay-fuse-mainnet/version/latest",
  cache: new InMemoryCache(),
});

const apolloClientNeo = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/68297/wildpay-neo-mainnet/version/latest",
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
  const client =
    network === "ethereum"
      ? apolloClientEthereum
      : network === "base"
      ? apolloClientBase
      : network === "fuse"
      ? apolloClientFuse
      : apolloClientNeo;
  const {
    data: paymentData,
    loading,
    error,
    refetch,
  } = useQuery(PAYMENTS_GQL, {
    variables: { hash },
    fetchPolicy: "network-only",
    client: client,
  });

  if (error) {
    console.log("error: ", error);
  }

  return { paymentData, loading, error, refetch };
};

/**
 * FETCH: useFetchWithdraw()
 * DB: subpgraph
 * TABLE: "withdrawChanges"
 * RETURN: { withdrawChanges }
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
  const client =
    network === "ethereum"
      ? apolloClientEthereum
      : network === "base"
      ? apolloClientBase
      : network === "fuse"
      ? apolloClientFuse
      : apolloClientNeo;
  const {
    data: withdrawData,
    loading,
    error,
    refetch,
  } = useQuery(PAYMENTS_GQL, {
    variables: { hash },
    fetchPolicy: "network-only",
    client: client,
  });

  if (error) {
    console.log("error: ", error);
  }

  return { withdrawData, loading, error, refetch };
};