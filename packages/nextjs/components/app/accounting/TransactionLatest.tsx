"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TimeAgoUnix } from "../TimeAgo";
import { Avatar } from "../authentication/Avatar";
import { Spotlight } from "../ui/spotlight";
import { formatEther } from "viem";
import { EthIcon } from "~~/components/assets/EthIcon";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth/useNativeCurrencyPrice";
import { fetchPublicProfileFromWalletId } from "~~/utils/app/fetch/fetchUser";
import { convertEthToUsd } from "~~/utils/app/functions/convertEthToUsd";

type Props = {
  tx: any;
};

const TransactionLatest = ({ tx }: Props) => {
  const [senderProfile, setSenderProfile] = useState<any | undefined>(undefined);
  const [receiverProfile, setReceiverProfile] = useState<any | undefined>(undefined);
  const nativeCurrencyPrice = useNativeCurrencyPrice();

  useEffect(() => {
    const fetchData = async () => {
      if (tx) {
        console.log("TransactionLatest: tx ", tx);
        const senderProfileData = await fetchPublicProfileFromWalletId(tx.payments[0].sender);
        const receiverProfileData = await fetchPublicProfileFromWalletId(tx.payments[0].receiver);
        setSenderProfile(senderProfileData);
        setReceiverProfile(receiverProfileData);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts or when tx changes
  }, [tx]);

  return (
    <>
      {tx && senderProfile && (
        <>
          <div className="w-full rounded-xxl bg-black/[0.96] relative ">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
            <div className="mt-5 p-6" key={tx.payments[0].transactionHash}>
              <div className="flex justify-between mb-6">
                <div className="flex items-center btn btn-accent bg-gradient-to-r from-cyan-600 via-lime-500 h-10 min-h-10 p-0 pl-2 pr-2">
                  <Avatar profile={senderProfile} width={8} ring={false} />
                  <div className="font-semibold">{senderProfile.username}</div>
                </div>
                <div className="flex items-center btn btn-accent bg-gradient-to-r from-cyan-600 via-lime-500 h-10 min-h-10 p-0 pl-2 pr-2">
                  <Avatar profile={receiverProfile} width={8} ring={false} />
                  <div className="font-semibold">{receiverProfile.username}</div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                  {`"`}
                  {tx.payments[0]?.message}
                  {`"`}
                </div>
                <div className="w-2/4 flex flex-col items-end mb-6 text-neutral font-semibold">
                  <div className="text-3xl">
                    ${convertEthToUsd(formatEther(tx.payments[0].value), nativeCurrencyPrice).toFixed(0)}
                  </div>
                  <div className="flex text-xl items-center">
                    <EthIcon width={18} height={18} />
                    {Number(formatEther(tx.payments[0].value)).toFixed(4)}
                  </div>
                </div>
              </div>
              <div className="flex justify-end text-neutral font-medium">
                <TimeAgoUnix timestamp={tx.payments[0]?.createdAt} /> <span className="ml-1">ago</span>
              </div>
            </div>
          </div>
          <Link href={"/blockexplorer/transaction/" + tx.payments[0].transactionHash} className="btn btn-primary w-full mt-3 mb-2">Go to receipt</Link>
        </>
      )}
    </>
  );
};

export default TransactionLatest;
