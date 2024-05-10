"use server";

import { createClient } from "~~/utils/supabase/server";

/**
 * FETCH: fetchFollowersNotifications()
 * DB: supabase
 * TABLE: notifications
 * RETURN: { data }
 **/

export const fetchFollowersNotifications = async (user_id: any) => {
  const supabase = createClient();
  try {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user_id)
      .order("follower_created_at", { ascending: false });
    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return null;
  }
};
