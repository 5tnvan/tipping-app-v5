"use client";

import React from "react";
import { AddressWithReveal } from "../AddressWithReveal";
import { TimeAgoUnix } from "../TimeAgo";
import { formatEther } from "viem";
import { EthIcon } from "~~/components/assets/EthIcon";

const Transactions = ({ tx, hide }) => {
  return (
    <>
      {tx?.tips?.map((tip: any) => (
        <div className="mb-3" key={tip.id}>
          {/* sender, value */}
          <div className="flex justify-between mb-1">
            {hide == "to" && (
              <div className="flex">
                <AddressWithReveal address={tip?.sender} />
              </div>
            )}
            {hide == "from" && (
              <div className="flex">
                <AddressWithReveal address={tip?.receiver} />
              </div>
            )}
            <div className="flex font-semibold">
              <EthIcon width={16} height={16} />
              {Number(formatEther(tip?.value)).toFixed(4)}
            </div>
          </div>
          {/* msg and time */}
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
