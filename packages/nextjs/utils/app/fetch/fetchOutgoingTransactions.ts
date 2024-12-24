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
 * FETCH: fetchOutgoingTransactions()
 * DB: subpgraph
 * TABLE: "paymentsChanges"
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

  const { data: ethereumData } = useQuery(gql(PAYMENTS_GRAPHQL), {
    variables: { senderAddress },
    pollInterval: 10000,
    fetchPolicy: "network-only",
    client: apolloClientEthereum,
  });

  const { data: baseData } = useQuery(gql(PAYMENTS_GRAPHQL), {
    variables: { senderAddress },
    pollInterval: 10000,
    fetchPolicy: "network-only",
    client: apolloClientBase,
  });

  const { data: fuseData } = useQuery(gql(PAYMENTS_GRAPHQL), {
    variables: { senderAddress },
    pollInterval: 10000,
    fetchPolicy: "network-only",
    client: apolloClientFuse,
  });

  const { data: neoData } = useQuery(gql(PAYMENTS_GRAPHQL), {
    variables: { senderAddress },
    pollInterval: 10000,
    fetchPolicy: "network-only",
    client: apolloClientNeo,
  });

  return { ethereumData, baseData, fuseData, neoData };
};
