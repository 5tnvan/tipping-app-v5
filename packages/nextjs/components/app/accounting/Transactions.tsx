"use client";

import React from "react";
import { AddressWithReveal } from "../AddressWithReveal";
import { TimeAgoUnix } from "../TimeAgo";
import { formatEther } from "viem";
import { EthIcon } from "~~/components/assets/EthIcon";

type Props = {
  tx: any;
  hide: string;
};

const Transactions = ({ tx, hide }: Props) => {
  return (
    <>
      {tx?.payments?.map((payment: any) => (
        <div className="mb-3" key={payment.id}>
          {/* sender, value */}
          <div className="flex justify-between mb-1">
            {hide == "to" && (
              <div className="flex">
                <AddressWithReveal address={payment?.sender} />
              </div>
            )}
            {hide == "from" && (
              <div className="flex">
                <AddressWithReveal address={payment?.receiver} />
              </div>
            )}
            <div className="flex font-semibold">
              <EthIcon width={16} height={16} />
              {Number(formatEther(payment?.value)).toFixed(4)}
            </div>
          </div>
          {/* msg and time */}
          <div className="flex justify-between text-gray-500">
            <div>{payment?.message}</div>
            <div>
              <TimeAgoUnix timestamp={payment?.createdAt} />
            </div>
          </div>
        </div>
      ))}

      {tx?.payments?.length === 0 && <div>Be the first to pay</div>}
    </>
  );
};

export default Transactions;
