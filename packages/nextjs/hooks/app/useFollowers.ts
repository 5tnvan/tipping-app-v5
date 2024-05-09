"use client";

import { useEffect, useState } from "react";
import { fetchFollowsFromId } from "~~/utils/app/fetch/fetchFollows";
import { fetchProfileFromUsername } from "~~/utils/app/fetch/fetchProfile";
import { fetchUser } from "~~/utils/app/fetch/fetchUser";

/**
 * USEFOLLOWERS HOOK
 * Use this to get follow data of currently authenticated user
 **/
export const useFollowers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [followersData, setFollowersData] = useState({
    followed: false,
    followers: [] as any[],
    following: [] as any[],
  });
  const [followers, setFollowers] = useState<any[]>();
  const [following, setFollowing] = useState<any[]>();
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const init = async () => {
    setIsLoading(true);

    const user = await fetchUser();
    if (user?.user?.id) {
      const followersData = await fetchFollowsFromId(user.user?.id);
      setFollowersData(followersData);
      setFollowers(followersData.followers);
      setFollowing(followersData.following);
    }

    setIsLoading(false);
  };

  const refetch = () => {
    setTriggerRefetch(prev => !prev);
  };

  useEffect(() => {
    init();
  }, [triggerRefetch]);

  return { isLoading, followersData, followers, following, refetch };
};

/**
 * USEFOLLOWERS HOOK
 * Use this to get follow data of (username)
 **/
export const useFollowersByUsername = (username: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [followersData, setFollowersData] = useState({
    followed: false,
    followers: [] as any[],
    following: [] as any[],
  });
  const [followed, setFollowed] = useState<boolean>();
  const [followers, setFollowers] = useState<any[]>();
  const [following, setFollowing] = useState<any[]>();
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const init = async () => {
    setIsLoading(true); // Set loading to true when starting data fetch

    const profile = await fetchProfileFromUsername(username);
    if (profile?.id != null) {
      const followersData = await fetchFollowsFromId(profile.id);
      setFollowersData(followersData);
      setFollowed(followersData.followed);
      setFollowers(followersData.followers);
      setFollowing(followersData.following);
    }

    setIsLoading(false); // Set loading to false when fetch is complete
  };

  const refetch = () => {
    setTriggerRefetch(prev => !prev);
  };

  useEffect(() => {
    init();
  }, [username, triggerRefetch]);

  return { isLoading, followersData, followed, followers, following, refetch };
};
