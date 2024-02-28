"use client";

import { createClient } from "~~/utils/supabase/client";

/* PROFILE ACTIONS */
/* GET USER */
export async function getProfile(username: string) {
  const supabase = createClient();
  const { data } = await supabase.from("profiles").select("*").eq("username", username);
console.log(data?.length); 
  if (data?.length >= 1) {
    //profile exists
    console.log(data[0]); 
    return data[0];
  }
}
