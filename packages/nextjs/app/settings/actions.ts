"use server";

import { createClient } from "~~/utils/supabase/server";

/* PROFILE ACTIONS */

/* UPDATE PROFILE */
export async function updateProfileWallet(wallet_id: string, wallet_sign_hash: string, wallet_sign_timestamp: string) {
  console.log("I'm updating profile with wallet sign hash");
  const supabase = createClient();

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
