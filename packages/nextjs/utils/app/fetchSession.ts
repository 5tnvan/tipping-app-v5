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

export const fetchSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.log(error);
    return null;
  } else {
    console.log("fetchSession(): " + JSON.stringify(data, null, 2));
    return data;
  }
};
