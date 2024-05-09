"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { Hash, formatEther } from "viem";
import { TimeAgoUnix } from "~~/components/app/TimeAgo";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { Spotlight } from "~~/components/app/ui/spotlight";
import { BaseIcon } from "~~/components/assets/BaseIcon";
import { EthIcon } from "~~/components/assets/EthIcon";
import { Address } from "~~/components/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { useFetchWithdraw } from "~~/utils/app/fetch/fetchTransaction";
import { fetchPublicProfileFromWalletId } from "~~/utils/app/fetch/fetchUser";
import { convertEthToUsd } from "~~/utils/app/functions/convertEthToUsd";

type PageProps = {
  params: { network?: string; txHash?: Hash };
};
const TransactionPage: NextPage<PageProps> = ({ params }: PageProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [dateUnix, setDateUnix] = useState<any>();
  const [walletProfile, setWalletProfile] = useState<any | undefined>(undefined);
  const price = useGlobalState(state => state.nativeCurrencyPrice);

  /**
   * ACTION: Fetch transaction from graph
   **/
  const { withdrawData, loading, error } = useFetchWithdraw(params.txHash, params.network);
  useEffect(() => {
    if (withdrawData && withdrawData.withdrawChanges.length > 0 && !loading) {
      const fetchData = async () => {
        const walletProfileData = await fetchPublicProfileFromWalletId(withdrawData.withdrawChanges[0].wallet);
        setWalletProfile(walletProfileData);
        const myDate = new Date(withdrawData.withdrawChanges[0].blockTimestamp * 1000);
        setDateUnix(myDate);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [withdrawData]);

  return (
    <>
      <div className="mt-14 pl-6 pr-6 overflow-auto wildui-transaction-scroll-transaction">
        <button className="btn btn-sm btn-primary" onClick={() => router.back()}>
          Back
        </button>
        {error && <>Sorry, something went wrong. Please try again later.</>}
        {withdrawData && withdrawData.withdrawChanges.length == 0 && (
          <div className="mt-5">Please try again later.</div>
        )}
        {/* SPOTLIGHT */}
        {withdrawData && (
          <>
            <div className="w-full rounded-xxl bg-black/[0.96] relative ">
              <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
              <div className="mt-5 p-6" key={withdrawData.withdrawChanges[0].transactionHash}>
                {/* SPOTLIGHT FROM TO */}
                <div className="flex justify-between items-center mb-6">
                  <div
                    className="flex items-center btn btn-accent bg-gradient-to-r from-cyan-600 via-lime-500 h-10 min-h-10 p-0 pl-2 pr-2"
                    onClick={() => router.push("/" + walletProfile.username)}
                  >
                    {walletProfile && (
                      <Avatar profile={walletProfile} width={8} ring={8} height={8} border={0} gradient={undefined} />
                    )}
                    <div className="font-semibold">
                      {isLoading && <div className="animate-pulse w-8 h-2"></div>}
                      {walletProfile && !isLoading && walletProfile.username}
                      {!walletProfile && !isLoading && "anon"}
                    </div>
                  </div>
                </div>
                {/* SPOTLIGHT MID */}
                <div className="flex justify-between">
                  <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                    Withdrawal:
                  </div>
                  <div className="w-2/4 flex flex-col items-end mb-6 text-neutral font-semibold">
                    <div className="text-3xl">
                      ${convertEthToUsd(formatEther(withdrawData.withdrawChanges[0].value), price).toFixed(2)}
                    </div>
                    <div className="flex text-xl items-center">
                      {Number(formatEther(withdrawData.withdrawChanges[0].value)).toFixed(4)}Ξ
                    </div>
                  </div>
                </div>
                {/* SPOTLIGHT NETWORK & TIME AG0 */}
                <div className="flex justify-end text-neutral-400 font-medium">
                  <TimeAgoUnix timestamp={withdrawData.withdrawChanges[0]?.blockTimestamp} />
                  <span className="ml-1">ago</span>
                </div>
              </div>
            </div>
          </>
        )}
        {/* RECEIPT */}
        {withdrawData && dateUnix && (
          <>
            <div className="overflow-x-auto mt-3">
              <table className="table text-base">
                {/* head */}
                <tbody>
                  {/* row 0 */}
                  <tr className="hover">
                    <th>Network:</th>
                    <td className="text-ellipsis overflow-hidden md:max-w-96 max-w-24">
                      {params.network == "ethereum" && (
                        <div className="btn btn-accent font-medium h-6 min-h-6 gap-0 px-2 mr-1">
                          <EthIcon width={14} height={14} fill="#3C3C3C" />
                          ethereum
                        </div>
                      )}
                      {params.network == "base" && (
                        <div className="btn btn-accent font-medium h-6 min-h-6 gap-0 px-2 mr-1">
                          <BaseIcon width={10} height={10} fill="#3C3C3C" />
                          <div className="pl-1">base</div>
                        </div>
                      )}
                    </td>
                  </tr>
                  {/* row 1 */}
                  <tr className="hover">
                    <th>Hash</th>
                    <td className="text-ellipsis overflow-hidden md:max-w-96 max-w-24">
                      {withdrawData?.withdrawChanges[0].transactionHash}
                    </td>
                  </tr>
                  {/* row 2 */}
                  <tr className="hover">
                    <th>To</th>
                    <td>
                      <Address address={withdrawData?.withdrawChanges[0].wallet} format="short" />
                    </td>
                  </tr>
                  {/* row 3 */}
                  <tr className="hover">
                    <th>Value</th>
                    <td>{Number(formatEther(withdrawData?.withdrawChanges[0].value)).toFixed(4)} ETH</td>
                  </tr>
                  <tr className="hover">
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
