"use server";

import { cookies } from "next/headers";
import { createClient } from "~~/utils/supabase/server";

/* PROFILE ACTIONS */
/* GET USER */
export async function getUser() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  //get user from supabase db
  const { data, error } = await supabase.auth.getUser();

  //if user not found, redirect to login
  if (error || !data?.user) {
    console.log("user not found");
    return { user: data, error: error };
  } else {
    //otherwise fetch user profile using user ID
    const { data: profileData } = await supabase.from("profiles").select().eq("id", data.user.id);

    return { user: profileData[0], error: null };
  }
}

/* UPDATE PROFILE */
export async function updateProfile(
  wallet_id: string,
  wallet_sign_hash: string,
  wallet_sign_timestamp: EpochTimeStamp,
) {
  console.log("I'm here");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  //get user from supabase db
  const { data, error } = await supabase.auth.getUser();

  //if user not found
  if (error || !data?.user) {
    console.log("user not found");
    return { user: data, error: error };
  } else {
    //otherwise update user profile using user ID
    const { error } = await supabase
      .from("profiles")
      .update({
        wallet_id: wallet_id,
        wallet_sign_hash: wallet_sign_hash,
        wallet_sign_timestamp: wallet_sign_timestamp,
      })
      .eq("id", data.user.id);

    if (error) {
      console.log(error);
    }
  }
}
