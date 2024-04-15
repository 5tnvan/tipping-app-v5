"use server";

import { createClient } from "~~/utils/supabase/server";

export async function updateRead(notification_id: any) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("notifications")
    .update({ follower_read: true })
    .eq("id", notification_id);
  if (error) {
    return null;
  }
  return data;
}