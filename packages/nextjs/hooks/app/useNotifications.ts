"use client";

import { useEffect, useState } from "react";
import { fetchFollowersNotifications } from "~~/utils/app/fetch/fetchNotifications";
import { fetchUser } from "~~/utils/app/fetch/fetchUser";
import { createClient } from "~~/utils/supabase/client";

export const useNotifications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>();
  const [notifications, setNotifications] = useState<any>();
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const supabase = createClient();

  //toggle triggerRefetch to false/true
  const refetch = () => {
    setTriggerRefetch(prev => !prev);
  };

  useEffect(() => {
    const initNotification = async () => {
      setIsLoading(true);
      const notificationsData = await fetchFollowersNotifications();
      setNotifications(notificationsData);
      const user = await fetchUser();
      setUser(user);
      setIsLoading(false);
    };

    initNotification();
  }, [triggerRefetch]);

  //LISTEN TO REALTIME CHANGES

  const handleChange = (payload: any) => {
    console.log("Change received!", payload);
    refetch();
  };

  console.log("user.id", user?.user?.id);

  supabase
    .channel("test")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "notifications", filter: `user_id=eq.${user?.user.id}` },
      handleChange,
    )
    .subscribe();

  return { isLoading, notifications, refetch };
};
