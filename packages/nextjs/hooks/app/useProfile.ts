"use client";

import { useEffect, useState } from "react";
import { fetchSuperProfile } from "~~/utils/app/fetch/fetchProfile";
import { fetchUser } from "~~/utils/app/fetch/fetchUser";

/**
 * USEPROFILE HOOK
 * Use this to get currently authenticated user's profile
 **/
export const useProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>();
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const refetch = () => {
    setTriggerRefetch(prev => !prev);
  };

  const init = async () => {
    setIsLoading(true); // Set loading to true when starting data fetch

    const userData = await fetchUser();
    if (userData?.user) {
      const profileData = await fetchSuperProfile();
      setProfile(profileData);
    }
    setIsLoading(false); // Set loading to false when fetch is complete
  };

  useEffect(() => {
    init();
  }, [triggerRefetch]);

  return { isLoading, profile, refetch };
};
