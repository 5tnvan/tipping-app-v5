"use client";

import { useEffect, useState } from "react";
import { fetchUser } from "~~/utils/app/fetch/fetchUser";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<string>("init");
  const [user, setUser] = useState<any>(null);
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const refetch = () => {
    setTriggerRefetch(prev => !prev);
  };

  const init = async () => {
    const res = await fetchUser();
    if (res && res?.user) {
      setIsAuthenticated("yes");
      setUser(res.user);
    } else {
      setIsAuthenticated("no");
    }
  };

  useEffect(() => {
    init();
  }, [triggerRefetch]);

  return { isAuthenticated, user, refetch };
};
