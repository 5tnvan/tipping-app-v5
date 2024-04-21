"use server";

import { fetchUser } from "./fetchUser";
import { createClient } from "~~/utils/supabase/server";

/**
 * FETCH: fetchProfile()
 * DB: supabase
 * TABLE: "profiles"
 **/

export const fetchLevels = async () => {
  const supabase = createClient();
  const userData = await fetchUser();

  if (userData) {
    const { data } = await supabase
      .from("levels")
      .select()
      .eq("user_id", userData.user?.id)
      .order("created_at", { ascending: true })
    return data;
  } else {
    return null;
  }
};