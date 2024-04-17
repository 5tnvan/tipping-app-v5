"use server";

import { fetchUser } from "./fetchUser";
import { createClient } from "~~/utils/supabase/server";

/**
 * FETCH: fetchProfile()
 * DB: supabase
 * TABLE: "profiles"
 **/

export const fetchBios = async () => {
  const supabase = createClient();
  const userData = await fetchUser();

  if (userData) {
    const { data } = await supabase
      .from("profile_bios")
      .select()
      .eq("user_id", userData.user?.id)
      .order("created_at", { ascending: false }) // Replace "timestamp_column" with the actual column name
      .limit(1);
    return data;
  } else {
    return null;
  }
};

/**
 * FETCH: fetchProfile()
 * DB: supabase
 * TABLE: "profiles"
 **/

export const fetchBiosById = async (id: any) => {
  const supabase = createClient();
  const userData = await fetchUser();

  if (userData) {
    const { data } = await supabase
      .from("profile_bios")
      .select()
      .eq("user_id", id)
      .order("created_at", { ascending: false })
      .limit(1);
    return data;
  } else {
    return null;
  }
};
