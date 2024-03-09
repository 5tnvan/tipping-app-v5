"use client";

import { useEffect, useState } from "react";
import { fetchPublicProfile } from "~~/utils/app/fetch/fetchUser";

export const usePublicProfile = (username) => {
  const [isLoading, setIsLoading] = useState(true);
  const [publicProfile, setProfile] = useState({
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
  });
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const refetch = () => {
    setTriggerRefetch(prev => !prev);
  };

  useEffect(() => {
    const initUser = async () => {
      setIsLoading(true); // Set loading to true when starting data fetch

      const profileData = await fetchPublicProfile(username);
      setProfile(profileData);

      setIsLoading(false); // Set loading to false when fetch is complete
    };

    initUser();
  }, [triggerRefetch, username]);

  return { isLoading, publicProfile, refetch };
};
