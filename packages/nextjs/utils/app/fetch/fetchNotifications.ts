"use server";

import { createClient } from "~~/utils/supabase/server";

/**
 * FETCH: fetchFollowersNotifications()
 * DB: supabase
 * TABLE: notifications
 * RETURN: { data }
 **/

export const fetchFollowersNotifications = async () => {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userData?.user?.id)
    .order("follower_created_at", { ascending: false });
  if (error) {
    return null;
  }
  console.log("fetchFollowersNotifications", data);
  return data;
};
