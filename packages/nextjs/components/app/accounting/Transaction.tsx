"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TimeAgoUnix } from "../TimeAgo";
import { Avatar } from "../authentication/Avatar";
import { Spotlight } from "../ui/spotlight";
import { formatEther } from "viem";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { EthIcon } from "~~/components/assets/EthIcon";
import { fetchPublicProfileFromWalletId } from "~~/utils/app/fetch/fetchUser";
import { convertEthToUsd } from "~~/utils/app/functions/convertEthToUsd";
import { useGlobalState } from "~~/services/store/store";

type Props = {
  tx: any;
  network: any;
  onClose: any;
};

const Transaction = ({ tx, network, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [senderProfile, setSenderProfile] = useState<any | undefined>(undefined);
  const [receiverProfile, setReceiverProfile] = useState<any | undefined>(undefined);
  const price = useGlobalState(state => state.nativeCurrencyPrice);

  useEffect(() => {
    const fetchData = async () => {
      if (tx) {
        console.log("Transaction: tx ", tx);
        const senderProfileData = await fetchPublicProfileFromWalletId(tx.paymentChanges[0].sender);
        const receiverProfileData = await fetchPublicProfileFromWalletId(tx.paymentChanges[0].receiver);
        setSenderProfile(senderProfileData);
        setReceiverProfile(receiverProfileData);
        setIsLoading(false);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts or when tx changes
  }, [tx]);

  return (
    <>
      {tx && (
        <>
          <div className="w-full rounded-xxl bg-black/[0.96] relative ">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
            <div className="mt-5 p-6" key={tx.paymentChanges[0].transactionHash}>
              <div className="flex justify-between mb-6">
                <div className="flex items-center btn btn-accent bg-gradient-to-r from-cyan-600 via-lime-500 h-10 min-h-10 p-0 pl-2 pr-2">
                  {senderProfile && (
                    <Avatar profile={senderProfile} width={8} height={8} border={0} ring={8} gradient={"g-white"} />
                  )}
                  <div className="font-semibold">
                    {isLoading && <div className="animate-pulse w-8 h-2"></div>}
                    {senderProfile && !isLoading && senderProfile.username}
                    {!senderProfile && !isLoading && "anon"}
                  </div>
                </div>
                <div className="text-neutral-400">
                  <ChevronDoubleRightIcon width={16} />
                </div>
                <div className="flex items-center btn btn-accent bg-gradient-to-r from-cyan-600 via-lime-500 h-10 min-h-10 p-0 pl-2 pr-2">
                  {receiverProfile && (
                    <Avatar profile={receiverProfile} width={8} height={8} border={0} ring={8} gradient={"g-white"} />
                  )}
                  <div className="font-semibold">
                    {isLoading && <div className="animate-pulse w-8 h-2"></div>}
                    {receiverProfile && !isLoading && receiverProfile.username}
                    {!receiverProfile && !isLoading && "anon"}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                  {`"`}
                  {tx.paymentChanges[0]?.newMessage}
                  {`"`}
                </div>
                <div className="w-2/4 flex flex-col items-end mb-6 text-neutral font-semibold">
                  <div className="text-3xl">
                    ${convertEthToUsd(formatEther(tx.paymentChanges[0].value), price).toFixed(0)}
                  </div>
                  <div className="flex text-xl items-center">
                    <EthIcon width={18} height={18} fill="#3C3C3C" />
                    {Number(formatEther(tx.paymentChanges[0].value)).toFixed(4)}
                  </div>
                </div>
              </div>
              <div className="flex justify-end text-neutral font-medium">
                <TimeAgoUnix timestamp={tx.paymentChanges[0]?.blockTimestamp} /> <span className="ml-1">ago</span>
              </div>
            </div>
          </div>
          <Link
            href={"/transaction/payment/" + network + "/" + tx.paymentChanges[0].transactionHash}
            className="btn btn-primary w-full mt-3 mb-2"
            onClick={onClose}
          >
            Go to receipt
          </Link>
        </>
      )}
    </>
  );
};

export default Transaction;
