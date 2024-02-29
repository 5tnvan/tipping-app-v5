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

export const fetchTips = async () => {
  //fetch user from supabase db
  const { data: userData } = await supabase.auth.getUser();
  return { userData };
};