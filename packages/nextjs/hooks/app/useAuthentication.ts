"use client";

import { useEffect, useState } from "react";
import { fetchBios } from "~~/utils/app/fetch/fetchBios";
import { fetchProfile, fetchUser } from "~~/utils/app/fetch/fetchUser";

export const useAuthentication = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState("init");
  const [user, setUser] = useState<any>();
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
  });
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
      setUser(userData.user);
      setProfile(profileData);
      setBios(profileBiosData);
      setIsAuth("yes");
    } else {
      setIsAuth("no");
    }

    setIsLoading(false); // Set loading to false when fetch is complete
  };

  useEffect(() => {
    initUser();
  }, [triggerRefetch]);

  return { isLoading, isAuth, user, profile, bios, refetch };
};
