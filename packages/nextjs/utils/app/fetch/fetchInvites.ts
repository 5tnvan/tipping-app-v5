"use server";

import { fetchUser } from "./fetchUser";
import { createClient } from "~~/utils/supabase/server";

/**
 * FETCH: fetchInvites()
 * DB: supabase
 * TABLE: "invites"
 **/

export const fetchInvites = async () => {
  const supabase = createClient();
  const userData = await fetchUser();

  if (userData) {
    const { data } = await supabase
      .from("invites")
      .select()
      .eq("user_id", userData.user?.id)
      .order("created_at", { ascending: false });
    return data;
  } else {
    return null;
  }
};
