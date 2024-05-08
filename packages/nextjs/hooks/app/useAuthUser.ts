"use client";

import { useEffect, useState } from "react";
import { fetchBios } from "~~/utils/app/fetch/fetchBios";
import { fetchLevels } from "~~/utils/app/fetch/fetchLevels";
import { fetchSuperProfile } from "~~/utils/app/fetch/fetchProfile";
import { fetchUser } from "~~/utils/app/fetch/fetchUser";

export const useAuthUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState("init");
  const [user, setUser] = useState<any>();
  const [profile, setProfile] = useState<any>();
  const [bios, setBios] = useState<any>();
  const [levels, setLevels] = useState<any>();
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const refetch = () => {
    setTriggerRefetch(prev => !prev);
  };

  const init = async () => {
    setIsLoading(true); // Set loading to true when starting data fetch

    const userData = await fetchUser();
    if (userData?.user) {
      const profileData = await fetchSuperProfile();
      const profileBiosData = await fetchBios();
      const profileLevelsData = await fetchLevels();
      setUser(userData.user);
      setProfile(profileData);
      setBios(profileBiosData);
      setLevels(profileLevelsData);
      setIsAuth("yes");
    } else {
      setIsAuth("no");
    }

    setIsLoading(false); // Set loading to false when fetch is complete
  };

  useEffect(() => {
    init();
  }, [triggerRefetch]);

  return { isLoading, isAuth, user, profile, bios, levels, refetch };
};
