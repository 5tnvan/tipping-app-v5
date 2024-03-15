"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TimeAgoUnix } from "../TimeAgo";
import { formatEther } from "viem";
import { EthIcon } from "~~/components/assets/EthIcon";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth/useNativeCurrencyPrice";
import { fetchPublicProfileFromWalletId } from "~~/utils/app/fetch/fetchUser";
import { convertEthToUsd } from "~~/utils/app/functions/convertEthToUsd";

const TransactionLatest = ({ tx }) => {
  const [senderProfile, setSenderProfile] = useState<any | undefined>(undefined);
  const [receiverProfile, setReceiverProfile] = useState<any | undefined>(undefined);
  const nativeCurrencyPrice = useNativeCurrencyPrice();

  useEffect(() => {
    const fetchData = async () => {
      if (tx.payments[0]) {
        const senderProfileData = await fetchPublicProfileFromWalletId(tx.payments[0].sender);
        const receiverProfileData = await fetchPublicProfileFromWalletId(tx.payments[0].receiver);

        setSenderProfile(senderProfileData);
        setReceiverProfile(receiverProfileData);

        console.log(senderProfileData);
        console.log(receiverProfileData);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts or when tx.payments[0] changes
  }, []);

  return (
    <>
      {tx?.payments?.[0] && senderProfile && (
        <>
          <div className="mb-3 custom-gradient-01 bg-slate-900 text-black p-5 rounded-lg" key={tx.payments[0].id}>
            <div className="flex justify-between mb-6">
              {senderProfile && (
                <>
                  <span>from @{senderProfile.username}</span>
                  <span>to @{receiverProfile.username}</span>
                </>
              )}
            </div>
            <div className="flex justify-between">
              <div className="w-10/12 text-2xl">
                {`"`}
                {tx.payments[0]?.message}
                {`"`}
              </div>
              <div className="flex flex-col items-end mb-6">
                <div className="text-2xl">
                  ${convertEthToUsd(formatEther(tx.payments[0]?.value), nativeCurrencyPrice).toFixed(0)}
                </div>
                <div className="flex justify-center">
                  <EthIcon width={18} height={18} />
                  {Number(formatEther(tx.payments[0]?.value)).toFixed(4)}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <TimeAgoUnix timestamp={tx.payments[0]?.createdAt} /> <span className="ml-1">ago</span>
            </div>
          </div>
          <Link
            href={`/blockexplorer/transaction/${tx.payments[0]?.transactionHash}`}
            className="btn btn-neutral w-full"
          >
            Go to transaction
          </Link>
        </>
      )}
    </>
  );
};

export default TransactionLatest;
