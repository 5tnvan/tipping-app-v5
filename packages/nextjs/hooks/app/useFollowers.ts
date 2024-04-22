"use client";

import { useEffect, useState } from "react";
import { fetchFollowersWithRange } from "~~/utils/app/fetch/fetchFollowers";
import { fetchProfile, fetchPublicProfile } from "~~/utils/app/fetch/fetchUser";

export const usePrivateFollowers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [followersData, setFollowersData] = useState({
    followed: false,
    followers: [] as any[],
    following: [] as any[],
  });
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const initUser = async () => {
    setIsLoading(true); // Set loading to true when starting data fetch

    const profileData = await fetchProfile();
    const followersData = await fetchFollowersWithRange(profileData?.id);
    setFollowersData(followersData);

    setIsLoading(false); // Set loading to false when fetch is complete
  };

  const refetch = () => {
    setTriggerRefetch(prev => !prev);
  };

  useEffect(() => {
    initUser();
  }, [triggerRefetch]);

  return { isLoading, followersData, refetch };
};

export const usePublicFollowers = (username: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [followersData, setFollowersData] = useState({
    followed: false,
    followers: [] as any[],
    following: [] as any[],
  });
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const initUser = async () => {
    setIsLoading(true); // Set loading to true when starting data fetch

    const profile = await fetchPublicProfile(username);
    if (profile?.id != null) {
      const followersData = await fetchFollowersWithRange(profile.id);
      setFollowersData(followersData);
    }

    setIsLoading(false); // Set loading to false when fetch is complete
  };

  const refetch = () => {
    setTriggerRefetch(prev => !prev);
  };

  useEffect(() => {
    initUser();
  }, [username, triggerRefetch]);

  return { isLoading, followersData, refetch };
};
