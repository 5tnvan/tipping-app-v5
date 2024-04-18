"use client";

import { useEffect, useState } from "react";
import { fetchBios } from "~~/utils/app/fetch/fetchBios";
import { fetchProfile, fetchProfileWithBios, fetchUser } from "~~/utils/app/fetch/fetchUser";

export const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState("init");
  const [user, setUser] = useState<any>();
  const [profile, setProfile] = useState<any>();
  const [bios, setBios] = useState<any>();
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const refetch = () => {
    setTriggerRefetch(prev => !prev);
  };

  const initUser = async () => {
    setIsLoading(true); // Set loading to true when starting data fetch

    const userData = await fetchUser();
    if (userData?.user) {
      const profileData = await fetchProfile();
      const profileBiosData = await fetchBios();
      const profileWithBiosData = await fetchProfileWithBios();
      console.log("profileData", profileData);
      console.log("profileWithBiosData", profileWithBiosData);
      setUser(userData.user);
      setProfile(profileWithBiosData);
      setBios(profileBiosData);
      setIsAuth("yes");
    } else {
      setIsAuth("no");
    }

    setIsLoading(false); // Set loading to false when fetch is complete
  };

  console.log("profile", profile);

  useEffect(() => {
    initUser();
  }, [triggerRefetch]);

  return { isLoading, isAuth, user, profile, bios, refetch };
};
