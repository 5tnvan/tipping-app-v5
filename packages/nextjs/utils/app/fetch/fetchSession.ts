"use server";

import { createClient } from "~~/utils/supabase/server";

/**
 * Create Supabase Client
 **/
const supabase = createClient();

/**
 * FETCH: fetchSession()
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
    return data;
  }
};
