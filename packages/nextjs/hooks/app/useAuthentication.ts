import { useEffect, useState } from "react";
import { fetchProfile, fetchUser } from "~~/utils/app/fetchUser";

/**
 * HOOK: useAuthentication
 * Description: check if user is authenticated, init user with profile data
 **/
export const useAuthentication = () => {
  const [isAuth, setIsAuth] = useState("init");
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
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const refetch = () => {
    setTriggerRefetch(prev => !prev);
  };

  useEffect(() => {
    const initUser = async () => {
      const userData = await fetchUser();

      console.log(userData.userData.user);

      if (userData.userData.user != null) {
        setIsAuth("yes");
        const profileData = await fetchProfile();
        setProfile(profileData);
      } else {
        setIsAuth("no");
      }
    };

    initUser();
  }, [triggerRefetch]);

  return { isAuth, profile, refetch };
};
