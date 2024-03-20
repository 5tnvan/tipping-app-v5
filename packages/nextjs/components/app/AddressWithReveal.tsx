"use client";

import { useState } from "react";
import { Avatar } from "./authentication/Avatar";
import { Address as AddressType, getAddress, isAddress } from "viem";
import { EyeIcon } from "@heroicons/react/24/solid";
import { fetchPublicProfileFromWalletId } from "~~/utils/app/fetch/fetchUser";

type AddressProps = {
  address?: AddressType;
};

/**
 * Displays an address (or ENS) with a Blockie image and option to copy address.
 */
export const AddressWithReveal = ({ address }: AddressProps) => {
  const [profile, setProfile] = useState<any>();
  const [isReveal, setIsReveal] = useState(false);
  const checkSumAddress = address ? getAddress(address) : undefined;

  const handleProfileReveal = async () => {
    if (address) {
      const profile = await fetchPublicProfileFromWalletId(address);
      setProfile(profile);
    }
    setIsReveal(true);
  };

  // Skeleton UI
  if (!checkSumAddress) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-300 h-6 w-6"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (!isAddress(checkSumAddress)) {
    return <span className="text-error">Wrong address</span>;
  }

  return (
    <div className="flex items-center">
      <div className="btn btn-primary h-8 min-h-8 mr-3" onClick={handleProfileReveal}>
        {!isReveal && (
          <span className="w-4">
            <EyeIcon />
          </span>
        )}
        {isReveal && profile && (
          <div className="font-semibold flex items-center">
            <Avatar profile={profile} width={6} ring={false} />
            <span className="ml-1">@{profile.username}</span>
          </div>
        )}
        {isReveal && !profile && <div className="font-semibold">anon</div>}
      </div>
    </div>
  );
};
