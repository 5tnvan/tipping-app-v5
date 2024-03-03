import { useEffect, useState } from "react";
import { fetchProfile, fetchSession, fetchUser } from "~~/utils/app/fetchUser";

export const useAuthentication = () => {
  const [isAuth, setIsAuth] = useState("init");
  const [user, setUser] = useState();
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
      //fetch session
      const sessionData = await fetchSession();

      // console.log("initUser() sessionData: ", sessionData?.session);

      if (sessionData?.session != null) {
        setIsAuth("yes");
        const userData = await fetchUser();
        const profileData = await fetchProfile();
        setUser(userData.userData.user);
        setProfile(profileData);
      } else {
        setIsAuth("no");
      }
    };

    initUser();
  }, [triggerRefetch]);

  // console.log("useAuthentication() isAuth: " + isAuth);

  return { isAuth, user, profile, refetch };
};
