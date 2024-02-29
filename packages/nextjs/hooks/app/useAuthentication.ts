import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProfile, fetchUser } from "~~/utils/app/fetchUser";

/**
 * HOOK: useAuthentication
 * Description: check if user is loggedin
 **/
export const useAuthentication = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState("init");

  useEffect(() => {
    const initUser = async () => {
      const userData = await fetchUser();
      if (!userData) {
        router.push("/login");
      } else {
        setIsLogin("loggedin");
      }
    };

    initUser();
  }, [router]);

  return { isLogin };
};

/**
 * HOOK: useAuthentication
 * Description: check if user is loggedin and initialize user's profile
 **/
export const useAuthenticationWithProfileInit = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState("init");
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

  useEffect(() => {
    const initUser = async () => {
      const userData = await fetchUser();
      if (!userData) {
        router.push("/login");
      } else {
        setIsLogin("loggedin");
        const profileData = await fetchProfile();
        setProfile(profileData);
      }
    };

    initUser();
  }, [router]);

  return { isLogin, profile };
};
