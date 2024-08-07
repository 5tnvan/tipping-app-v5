"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IsLoading } from "./IsLoading";
import { Avatar } from "./authentication/Avatar";
import { EyeIcon } from "@heroicons/react/24/solid";
import { fetchPublicProfileFromId } from "~~/utils/app/fetch/fetchUser";

type ProfileProps = {
  profile_id: any;
};

/**
 * On click, reveal profile
 */
export const ProfileRevealInvite = ({ profile_id }: ProfileProps) => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [isReveal, setIsReveal] = useState(false);

  const handleProfileReveal = async () => {
    if (profile_id && !profile) {
      setIsLoading(true);
      const profile = await fetchPublicProfileFromId(profile_id);
      setProfile(profile);
      setIsLoading(false);
    }
    setIsReveal(true);
  };

  const handleLink = async () => {
    router.push(`/${profile.username}`);
  };

  return (
    <>
      {profile_id && (
        <div className="flex items-center">
          <div
            className="btn btn-accent pl-3 pr-3 h-8 min-h-8 mr-3 bg-gradient-to-r from-cyan-600 via-lime-500"
            onClick={profile_id && !profile ? handleProfileReveal : handleLink}
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
            {isReveal && !profile_id && <div className="font-semibold">unclaimed</div>}
          </div>
        </div>
      )}
      {!profile_id && (
        <div className="flex items-center">
          <div className="btn btn-neutral pl-3 pr-3 h-8 min-h-8" onClick={handleProfileReveal}>
            <span className="w-4">
              <EyeIcon />
            </span>
            {isReveal && <div className="">unclaimed</div>}
          </div>
        </div>
      )}
    </>
  );
};
