"use client";

import { gql, useQuery } from "@apollo/client";
import { formatEther } from "viem";

export const SumGreetingsValue = () => {
  const GREETINGS_GRAPHQL = `
{
  greetings(first: 25, orderBy: createdAt, orderDirection: desc) {
    id
    greeting
    premium
    value
    createdAt
    sender {
      address
      greetingCount
    }
  }
}
`;

  const GREETINGS_GQL = gql(GREETINGS_GRAPHQL);
  const { data: greetingsData, error } = useQuery(GREETINGS_GQL, { fetchPolicy: "network-only", pollInterval: 5000 });

  // Subgraph maybe not yet configured
  if (error) {
    return <></>;
  }

  // Calculate total sum of 'value'
  const totalSum =
    greetingsData?.greetings?.reduce((sum, greeting) => {
      return sum + Number(greeting.value);
    }, 0) || 0;

  const totalSumEth = formatEther(totalSum);

  return (
    <>
      <span>{totalSumEth}</span>
    </>
  );
};
