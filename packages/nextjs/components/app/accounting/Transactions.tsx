"use client";

import React from "react";
import Link from "next/link";
import { AddressWithReveal } from "../AddressWithReveal";
import { TimeAgoUnix } from "../TimeAgo";
import { formatEther } from "viem";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { EthIcon } from "~~/components/assets/EthIcon";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth/useNativeCurrencyPrice";
import { convertEthToUsd } from "~~/utils/app/functions/convertEthToUsd";

type Props = {
  tx: any;
  hide: string;
};

const Transactions = ({ tx, hide }: Props) => {
  const nativeCurrencyPrice = useNativeCurrencyPrice();
  return (
    <>
      {tx?.payments?.map((payment: any) => (
        <div className="mb-3" key={payment.id}>
          {/* line 1 */}
          <div className="flex justify-between">
            {/* left - profile, hoursago */}
            <div className="flex flex-col mb-1">
              {hide == "to" && (
                <div className="flex items-center">
                  <AddressWithReveal address={payment?.sender} />
                  <span className="ml-1">
                    <TimeAgoUnix timestamp={payment?.createdAt} />
                  </span>
                </div>
              )}
              {hide == "from" && (
                <div className="flex items-center">
                  <AddressWithReveal address={payment?.receiver} />
                  <span className="ml-1">
                    <TimeAgoUnix timestamp={payment?.createdAt} />
                  </span>
                </div>
              )}
              <div>{payment?.message}</div>
            </div>
            {/* right - usd/eth */}
            <div className="flex flex-col items-end">
              <div className="flex font-semibold">
                ${convertEthToUsd(formatEther(payment?.value), nativeCurrencyPrice)}
              </div>
              <div className="flex items-center">
                <EthIcon width={16} height={16} />
                {Number(formatEther(payment?.value)).toFixed(4)}
              </div>
            </div>
          </div>
          {/* line 2 */}
          <div className="flex justify-end">
            <Link href={`/blockexplorer/transaction/${payment?.transactionHash}`} className="btn btn-sm btn-outline">
              View
              <ArrowUpRightIcon width={8} stroke="2" />
            </Link>
          </div>
        </div>
      ))}

      {tx?.payments?.length === 0 && <div>Be the first to pay</div>}
    </>
  );
};

export default Transactions;
