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

/**
 * FETCH: fetchInviteByID()
 * DB: supabase
 * TABLE: "invites"
 **/

export const fetchInviteByID = async (id: any) => {
  const supabase = createClient();

  const { data: codeData, error } = await supabase.from("invites").select().eq("id", id);

  if (error) {
    throw new Error();
  }

  const { data: userData } = await supabase.from("profiles").select("id, username, avatar_url").eq("id", codeData[0].user_id);

  return { code: codeData, user: userData };
};
