"use server";

import { fetchUser } from "./fetchUser";
import { createClient } from "~~/utils/supabase/server";

/**
 * FETCH: fetchProfile()
 * DB: supabase
 * TABLE: "profiles"
 **/

export const fetchSuperProfile = async () => {
  const supabase = createClient();
  const user = await fetchUser();

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*, profile_bios(id, created_at, views), levels(id, level)")
      .eq("id", user.user?.id);
    return profile?.[0] ?? null;
  } else {
    return null;
  }
};