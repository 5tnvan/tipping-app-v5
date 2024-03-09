"use client";

import { useEffect, useState } from "react";
import { fetchFollowers } from "~~/utils/app/fetch/fetchFollowers";

export const useFollowers = profile_id => {
  const [isLoading, setIsLoading] = useState(true);
  const [followersData, setFollowersData] = useState({
    followed: false,
    followers: [],
    followersCount: 0,
    following: [],
    followingCount: 0,
  });
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const refetch = () => {
    setTriggerRefetch(prev => !prev);
  };

  useEffect(() => {
    const initUser = async () => {
      setIsLoading(true); // Set loading to true when starting data fetch

      const followersData = await fetchFollowers(profile_id);
      setFollowersData(followersData);

      setIsLoading(false); // Set loading to false when fetch is complete
    };

    initUser();
  }, [profile_id, triggerRefetch]);

  return { isLoading, followersData, refetch };
};
