"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { Hash, Transaction, formatEther } from "viem";
import { hardhat, sepolia } from "viem/chains";
import { usePublicClient } from "wagmi";
import { TimeAgoUnix } from "~~/components/app/TimeAgo";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { Spotlight } from "~~/components/app/ui/spotlight";
import { EthIcon } from "~~/components/assets/EthIcon";
import { Address } from "~~/components/scaffold-eth";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth/useNativeCurrencyPrice";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useFetchTransaction } from "~~/utils/app/fetch/fetchTransaction";
import { fetchPublicProfileFromWalletId } from "~~/utils/app/fetch/fetchUser";
import { convertEthToUsd } from "~~/utils/app/functions/convertEthToUsd";
import { decodeTransactionData } from "~~/utils/scaffold-eth";

type PageProps = {
  params: { txHash?: Hash };
};
const TransactionPage: NextPage<PageProps> = ({ params }: PageProps) => {
  const client = usePublicClient({ chainId: hardhat.id });
  const txHash = params?.txHash as Hash;
  const [transaction, setTransaction] = useState<Transaction>();
  const { targetNetwork } = useTargetNetwork();
  const router = useRouter();

  /**
   * ACTION: Fetch transaction
   **/
  useEffect(() => {
    if (txHash) {
      const fetchTransaction = async () => {
        const tx = await client.getTransaction({ hash: txHash });
        const transactionWithDecodedData = decodeTransactionData(tx);
        setTransaction(transactionWithDecodedData);
      };

      fetchTransaction();
    }
  }, [client, txHash]);

  const [dateUnix, setDateUnix] = useState<any>();
  const [senderProfile, setSenderProfile] = useState<any | undefined>(undefined);
  const [receiverProfile, setReceiverProfile] = useState<any | undefined>(undefined);
  const nativeCurrencyPrice = useNativeCurrencyPrice();

  /**
   * ACTION: Fetch transaction from graph
   **/
  const { transactionData, loading, error } = useFetchTransaction(params.txHash);
  useEffect(() => {
    if (transactionData && !loading) {
      const fetchData = async () => {
        const senderProfileData = await fetchPublicProfileFromWalletId(transactionData.payments[0].sender);
        const receiverProfileData = await fetchPublicProfileFromWalletId(transactionData.payments[0].receiver);
        setSenderProfile(senderProfileData);
        setReceiverProfile(receiverProfileData);
        const myDate = new Date(transactionData.payments[0].createdAt * 1000);
        setDateUnix(myDate);
      };
      fetchData();
    }
  }, [transactionData]);

  return (
    <>
      <div className="mt-14 pl-6 pr-6 overflow-auto wildui-transaction-scroll-transaction">
        {error && <>Sorry, something went wrong. Please try again later.</>}
        <button className="btn btn-sm btn-primary" onClick={() => router.back()}>
          Back
        </button>
        {transactionData && senderProfile && (
          <>
            <div className="w-full rounded-xxl bg-black/[0.96] relative ">
              <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
              <div className="mt-5 p-6" key={transactionData.payments[0].transactionHash}>
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
                    {transactionData.payments[0]?.message}
                    {`"`}
                  </div>
                  <div className="w-2/4 flex flex-col items-end mb-6 text-neutral font-semibold">
                    <div className="text-3xl">
                      ${convertEthToUsd(formatEther(transactionData.payments[0].value), nativeCurrencyPrice).toFixed(0)}
                    </div>
                    <div className="flex text-xl items-center">
                      <EthIcon width={18} height={18} />
                      {Number(formatEther(transactionData.payments[0].value)).toFixed(4)}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end text-neutral font-medium">
                  <TimeAgoUnix timestamp={transactionData.payments[0]?.createdAt} /> <span className="ml-1">ago</span>
                </div>
              </div>
            </div>
          </>
        )}
        {transaction && transactionData && dateUnix && (
          <>
            <div className="overflow-x-auto mt-3">
              <table className="table text-base">
                {/* head */}
                <tbody>
                  {/* row 0 */}
                  <tr className="hover">
                    <th>Receipt:</th>
                    <td className="text-ellipsis overflow-hidden md:max-w-96 max-w-24"></td>
                  </tr>
                  {/* row 1 */}
                  <tr className="hover">
                    <th>Hash</th>
                    <td className="text-ellipsis overflow-hidden md:max-w-96 max-w-24">
                      {transactionData?.payments[0].transactionHash}
                    </td>
                  </tr>
                  {/* row 2 */}
                  <tr className="hover">
                    <th>From</th>
                    <td>
                      <Address address={transactionData?.payments[0].sender} format="short" />
                    </td>
                  </tr>
                  {/* row 3 */}
                  <tr className="hover">
                    <th>To</th>
                    <td>
                      <Address address={transactionData?.payments[0].receiver} format="short" />
                    </td>
                  </tr>
                  {/* row 3 */}
                  <tr className="hover">
                    <th>Value</th>
                    <td>
                      {Number(formatEther(transactionData?.payments[0].value)).toFixed(4)}{" "}
                      {targetNetwork.nativeCurrency.symbol}
                    </td>
                  </tr>
                  <tr>
                    <th>Datetime</th>
                    <td>{dateUnix.toUTCString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TransactionPage;
