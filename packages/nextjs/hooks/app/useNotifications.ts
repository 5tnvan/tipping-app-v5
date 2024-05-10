"use client";

import { useEffect, useState } from "react";
import { fetchFollowersNotifications } from "~~/utils/app/fetch/fetchNotifications";
import { fetchUser } from "~~/utils/app/fetch/fetchUser";
import { createClient } from "~~/utils/supabase/client";

/**
 *  HOOK
 * Use this to get notification data of currently authenticated user
 **/
export const useNotifications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>();
  const [notifications, setNotifications] = useState<any>();
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const supabase = createClient();

  const init = async () => {
    setIsLoading(true);
    const user = await fetchUser();
    if (user.user?.id) {
      setUser(user);
      const notificationsData = await fetchFollowersNotifications(user?.user?.id);
      setNotifications(notificationsData);
    }
    setIsLoading(false);
  };

  const refetch = () => {
    setTriggerRefetch(prev => !prev); //toggle triggerRefetch to false/true
  };

  useEffect(() => {
    init();
  }, [triggerRefetch]);

  //LISTEN TO REALTIME CHANGES
  const handleChange = (payload: any) => {
    console.log("Change received!", payload);
    refetch();
  };

  supabase
    .channel("test")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${user?.user?.id}` },
      handleChange,
    )
    .subscribe();

  return { isLoading, notifications, refetch };
};
