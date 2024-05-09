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
  const [isAuth, setIsAuth] = useState("init");
  const [user, setUser] = useState<any>();
  const [profile, setProfile] = useState<any>();
  // const [bios, setBios] = useState<any>();
  // const [levels, setLevels] = useState<any>();
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const refetch = () => {
    setTriggerRefetch(prev => !prev);
  };

  const init = async () => {
    setIsLoading(true); // Set loading to true when starting data fetch

    const userData = await fetchUser();
    if (userData?.user) {
      const profileData = await fetchSuperProfile();
      setUser(userData.user);
      setProfile(profileData);
      setIsAuth("yes");
    } else {
      setIsAuth("no");
    }

    setIsLoading(false); // Set loading to false when fetch is complete
  };

  useEffect(() => {
    init();
  }, [triggerRefetch]);

  return { isLoading, isAuth, user, profile, refetch };
};
