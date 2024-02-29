"use client";

import { createClient } from "~~/utils/supabase/client";

/* PUBLIC PROFILE ACTIONS */
/* GET PROFILE */
export async function getProfile(username: string) {
  const supabase = createClient();
  const { data } = await supabase.from("profiles").select("*").eq("username", username);

  if (data?.length >= 1) {
    //profile exists
    return data[0];
  }
}
