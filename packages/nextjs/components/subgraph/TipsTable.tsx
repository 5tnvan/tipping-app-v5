"use client";

import { gql, useQuery } from "@apollo/client";
import { Address } from "~~/components/scaffold-eth";

const TipsTable = ({ receiverAddress }) => {
  const TIPS_GRAPHQL = `
    query GetTips($receiverAddress: Bytes!) {
      tips(
        first: 25
        where: { receiver: $receiverAddress }
        orderBy: createdAt
        orderDirection: desc
      ) {
        id
        sender
        receiver
        greeting
        value
        fee
        createdAt
        transactionHash
      }
    }
  `;

  const TIPS_GQL = gql(TIPS_GRAPHQL);
  const { data: tipsData, error } = useQuery(TIPS_GQL, {
    variables: { receiverAddress },
    fetchPolicy: "network-only",
  });

  // Subgraph maybe not yet configured
  if (error) {
    console.log(error);
    return <></>;
  }

  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <div className="overflow-x-auto shadow-2xl rounded-xl">
          {tipsData?.tips?.map((tip: any) => {
            return (
              <>
                <Address address={tip?.sender} />
                <Address address={tip?.receiver} />
                <div>{tip?.greeting}</div>
                <div>{tip?.value}</div>
                <div>{tip?.fee}</div>
                <div>{tip?.createdAt}</div>
                <div></div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TipsTable;
