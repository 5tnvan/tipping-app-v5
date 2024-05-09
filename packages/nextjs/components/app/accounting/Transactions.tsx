"use client";

import React from "react";
import Link from "next/link";
import { AddressWithReveal } from "../AddressWithReveal";
import { TimeAgoUnix } from "../TimeAgo";
import { formatEther } from "viem";
import { ArrowDownLeftIcon } from "@heroicons/react/24/outline";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { BaseIcon } from "~~/components/assets/BaseIcon";
import { EthIcon } from "~~/components/assets/EthIcon";
import { useGlobalState } from "~~/services/store/store";
import { convertEthToUsd } from "~~/utils/app/functions/convertEthToUsd";

type Props = {
  tx: any;
  hide: string;
  network: any;
};

const Transactions = ({ tx, hide, network }: Props) => {
  const price = useGlobalState(state => state.nativeCurrencyPrice);
  return (
    <>
      {tx?.paymentChanges?.map((paymentChange: any) => (
        <div className="mb-3" key={paymentChange.id}>
          {/* line 1 */}
          <div className="flex justify-between">
            {/* left - profile, hoursago */}
            <div className="flex justify-center flex-col mb-1">
              {hide == "to" && (
                <div className="flex items-center">
                  <AddressWithReveal address={paymentChange?.sender} />
                  {network == "ethereum" && <EthIcon width={16} height={14} fill="#3C3C3C" />}
                  {network == "base" && <BaseIcon width={18} height={10} fill="#3C3C3C" />}
                  <span className="mr-1 text-sm text-slate-800 font-medium">
                    <TimeAgoUnix timestamp={paymentChange?.blockTimestamp} />
                  </span>
                  <ArrowDownLeftIcon width={10} />
                </div>
              )}
              {hide == "from" && (
                <div className="flex items-center">
                  <AddressWithReveal address={paymentChange?.receiver} />
                  {network == "ethereum" && <EthIcon width={14} height={14} fill="#3C3C3C" />}
                  {network == "base" && <BaseIcon width={18} height={10} fill="#3C3C3C" />}
                  <span className="mr-1 text-sm text-slate-800 font-medium">
                    <TimeAgoUnix timestamp={paymentChange?.blockTimestamp} />
                  </span>
                  <ArrowUpRightIcon width={10} />
                </div>
              )}
            </div>
            {/* right - usd/eth */}
            <div className="flex flex-col items-end">
              <div className="text-primary font-semibold">
                ${convertEthToUsd(formatEther(paymentChange?.value), price)}
              </div>
              <div className="flex items-center font-medium">
                {Number(formatEther(paymentChange?.value)).toFixed(4)}Ξ
              </div>
            </div>
          </div>
          {/* line 2 */}
          <div className="">
            <div className="mt-1 text-neutral-500 font-medium tracking-tight">
              {paymentChange?.newMessage}
              <Link
                href={`/transaction/payment/${network}/${paymentChange?.transactionHash}`}
                className="inline-flex text-primary h-6 min-h-6 text-sm ml-1"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Transactions;
