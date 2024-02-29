"use server";

import { cookies } from "next/headers";
import { createClient } from "~~/utils/supabase/server";

/**
 * Create Supabase Client
 **/
const cookieStore = cookies();
const supabase = createClient(cookieStore);

/**
 * FETCH: fetchUser()
 * DB: supabase
 * TABLE: "auth.user"
 * RETURN: { data }
 **/

export const fetchUser = async () => {
  //fetch user from supabase db
  const { data: userData } = await supabase.auth.getUser();
  return { userData };
};

/**
 * FETCH: fetchProfile()
 * DB: supabase
 * TABLE: "profiles"
 **/

export const fetchProfile = async () => {
  const { userData } = await fetchUser();

  if (userData) {
    const { data: profileData } = await supabase.from("profiles").select().eq("id", userData.user?.id);
    return profileData?.[0] ?? null;
  } else {
    return null;
  }
};