import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";

// Define your Apollo Client instances for each endpoint

//https://api.studio.thegraph.com/query/68297/wildpay-eth-mainnet/0.0.1
//https://api.studio.thegraph.com/query/68297/wildpay-sepolia-v4/0.0.1
const apolloClientEthereum = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/68297/wildpay-eth-mainnet/0.0.1",
  cache: new InMemoryCache(),
});

const SUBGRAPH_API_KEY = process.env.NEXT_PUBLIC_SUBGRAPH_API_KEY;

//https://gateway.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/ANu9ycvF7GU3K9Gt7ZkSRbXEt9wVr8vVEvH92p7MjX3P
//https://api.studio.thegraph.com/query/68297/wildpay-base-sepolia/0.0.1
const apolloClientBase = new ApolloClient({
  uri: `https://gateway.thegraph.com/api/${SUBGRAPH_API_KEY}/subgraphs/id/ANu9ycvF7GU3K9Gt7ZkSRbXEt9wVr8vVEvH92p7MjX3P`,
  cache: new InMemoryCache(),
});

/**
 * FETCH: fetchIncomingTransactions()
 * DB: subpgraph
 * TABLE: "paymentsChanges"
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

  const { data: ethereumData } = useQuery(gql(PAYMENTS_GRAPHQL), {
    variables: { receiverAddress },
    pollInterval: 10000,
    fetchPolicy: "network-only",
    client: apolloClientEthereum,
  });

  const { data: baseData } = useQuery(gql(PAYMENTS_GRAPHQL), {
    variables: { receiverAddress },
    pollInterval: 10000,
    fetchPolicy: "network-only",
    client: apolloClientBase,
  });

  return { ethereumData, baseData };
};
