"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IsLoading } from "./IsLoading";
import { Avatar } from "./authentication/Avatar";
import { Address as AddressType } from "viem";
import { EyeIcon } from "@heroicons/react/24/solid";
import { fetchPublicProfileFromWalletId } from "~~/utils/app/fetch/fetchUser";

type AddressProps = {
  address?: AddressType;
};

/**
 * On click, reveal profile
 */
export const AddressWithReveal = ({ address }: AddressProps) => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isReveal, setIsReveal] = useState(false);

  const handleProfileReveal = async () => {
    if (address && !profile) {
      setIsLoading(true);
      const profile = await fetchPublicProfileFromWalletId(address);
      setProfile(profile);
      setIsLoading(false);
    }
    setIsReveal(true);
  };

  const handleLink = async () => {
    router.push(`/${profile.username}`);
  };

  return (
    <div className="flex items-center">
      <div
        className="btn btn-accent pl-3 pr-3 h-8 min-h-8 mr-3 bg-gradient-to-r from-cyan-600 via-lime-500"
        onClick={address && !profile ? handleProfileReveal : handleLink}
      >
        {!isReveal && !isLoading && (
          <span className="w-4">
            <EyeIcon />
          </span>
        )}
        {isLoading && (
          <span className="flex">
            <IsLoading shape="rounded-md bg-accent" width={12} height={3} />
          </span>
        )}
        {isReveal && profile && (
          <div className="font-semibold flex items-center">
            <Avatar profile={profile} width={6} ring={6} height={6} border={0} gradient={undefined} />
            <span className="ml-1">@{profile.username}</span>
          </div>
        )}
        {isReveal && !profile && <div className="font-semibold">anon</div>}
      </div>
    </div>
  );
};
