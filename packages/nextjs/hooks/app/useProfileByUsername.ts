"use client";

import { useEffect, useState } from "react";
import { fetchProfileFromUsername } from "~~/utils/app/fetch/fetchProfile";

/**
 * USEPROFILEBYUSERNAME HOOK
 * Use this to get user's profile from (username)
 **/
export const useProfileByUsername = (username: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState({
    id: null,
    updated_at: null,
    username: null,
    full_name: null,
    avatar_url: null,
    website: null,
    youtube: null,
    instagram: null,
    twitter: null,
    tiktok: null,
    wallet_id: null,
    wallet_sign_hash: null,
    wallet_sign_timestamp: null,
    farcaster: null,
    lens: null,
    profile_bios: [],
  });
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const refetch = () => {
    setTriggerRefetch(prev => !prev);
  };

  useEffect(() => {
    const initUser = async () => {
      setIsLoading(true); // Set loading to true when starting data fetch

      const profileData = await fetchProfileFromUsername(username);
      setProfile(profileData);

      setIsLoading(false); // Set loading to false when fetch is complete
    };

    initUser();
  }, [triggerRefetch, username]);

  return { isLoading, profile, refetch };
};
