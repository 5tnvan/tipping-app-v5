"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { TimeAgoUnix } from "../TimeAgo";
import { formatEther } from "viem";
import { AppContext } from "~~/app/context";
import { EthIcon } from "~~/components/assets/EthIcon";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth/useNativeCurrencyPrice";
import { convertEthToUsd } from "~~/utils/app/functions/convertEthToUsd";

const TransactionLatest = ({ tx }) => {
  const { isLoadingAuth, isAuth, user, profile, refetchAuth } = useContext(AppContext);
  const nativeCurrencyPrice = useNativeCurrencyPrice();

  return (
    <>
      {tx?.tips?.[0] && (
        <>
          <div className="mb-3 custom-gradient-01 bg-slate-900 text-black p-5 rounded-lg" key={tx.tips[0].id}>
            <div className="flex justify-between mb-6">
              <span>from @{profile.username}</span>
              <span>to @{}</span>
            </div>
            <div className="flex justify-between">
              <div className="w-10/12 text-2xl">
                {`"`}
                {tx.tips[0]?.greeting}
                {`"`}
              </div>
              <div className="flex flex-col items-end mb-6">
                <div className="text-2xl">
                  ${convertEthToUsd(formatEther(tx.tips[0]?.value), nativeCurrencyPrice).toFixed(0)}
                </div>
                <div className="flex justify-center">
                  <EthIcon width={18} height={18} />
                  {Number(formatEther(tx.tips[0]?.value)).toFixed(4)}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <TimeAgoUnix timestamp={tx.tips[0]?.createdAt} /> <span className="ml-1">ago</span>
            </div>
            {/* <div className="flex justify-between text-gray-500">
              <div>{tx.tips[0]?.greeting}</div>
              <div>
                <TimeAgoUnix timestamp={tx.tips[0]?.createdAt} />
              </div>
            </div> */}
          </div>
          <Link href={`/blockexplorer/transaction/${tx.tips[0]?.transactionHash}`} className="btn btn-neutral w-full">
            Go to transaction
          </Link>
        </>
      )}
    </>
  );
};

export default TransactionLatest;
