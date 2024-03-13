"use client";

import React from "react";
import { TimeAgoUnix } from "../TimeAgo";
import { formatEther } from "viem";
import { EthIcon } from "~~/components/assets/EthIcon";
import { Address } from "~~/components/scaffold-eth";

const Transactions = ({ tx }) => {
  return (
    <>
      {tx?.tips?.map((tip: any) => (
        <div className="mb-3" key={tip.id}>
          <div className="flex justify-between mb-1">
            <Address address={tip?.sender} />
            <div className="flex font-semibold">
              <EthIcon width={16} height={16} />
              {Number(formatEther(tip?.value)).toFixed(4)}
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

      {tx?.tips?.length === 0 && <div>Be the first to pay</div>}
    </>
  );
};

export default Transactions;
