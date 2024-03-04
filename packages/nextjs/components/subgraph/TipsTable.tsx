"use client";

import { TimeAgo, TimeAgoUnix } from "../app/TimeAgo";
import { EthIcon } from "../assets/EthIcon";
import { gql, useQuery } from "@apollo/client";
import { formatEther } from "viem";
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
      <div className="">
        {tipsData?.tips?.map((tip: any) => (
          <div className="mb-3" key={tip.id}>
            <div className="flex justify-between mb-1">
              <Address address={tip?.sender} />
              <div className="flex font-semibold">
                <EthIcon width={16} height={16} />
                {formatEther(tip?.value)}
              </div>
            </div>
            <div className="flex justify-between text-gray-500">
              <div>{tip?.greeting}</div>
              <div>
                <TimeAgoUnix timestamp={tip?.createdAt} />
              </div>
            </div>
          </div>
        ))}

        {tipsData?.tips?.length === 0 && <div>Be the first to pay</div>}
      </div>
    </>
  );
};

export default TipsTable;
