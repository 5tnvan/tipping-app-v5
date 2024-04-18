"use client";

import { useEffect, useState } from "react";
import { fetchFollowers } from "~~/utils/app/fetch/fetchFollowers";
import { fetchProfile, fetchPublicProfile } from "~~/utils/app/fetch/fetchUser";

export const usePrivateFollowers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [followersData, setFollowersData] = useState({
    followed: false,
    followers: [] as any[],
    followersCount: 0,
    following: [] as any[],
    followingCount: 0,
  });
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const initUser = async () => {
    setIsLoading(true); // Set loading to true when starting data fetch

    const profileData = await fetchProfile();
    const followersData = await fetchFollowers(profileData?.id);
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
    followersCount: 0,
    following: [] as any[],
    followingCount: 0,
  });
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const initUser = async () => {
    setIsLoading(true); // Set loading to true when starting data fetch

    const profile = await fetchPublicProfile(username);
    if (profile?.id != null) {
      const followersData = await fetchFollowers(profile.id);
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
