"use client";

import { useEffect, useState } from "react";
import { fetchUser } from "~~/utils/app/fetch/fetchUser";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<string>("init");
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  const refetch = () => {
    setTriggerRefetch(prev => !prev);
  };

  const init = async () => {
    const res = await fetchUser();
    if (res && res?.user) {
      setIsAuthenticated("yes");
    } else {
      setIsAuthenticated("no");
    }
  };

  useEffect(() => {
    init();
  }, [triggerRefetch]);

  return { isAuthenticated, refetch };
};
