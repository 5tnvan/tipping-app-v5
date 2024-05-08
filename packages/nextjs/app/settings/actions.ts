"use server";

import { createClient } from "~~/utils/supabase/server";

/* PROFILE ACTIONS */

/* WALLET EXISTS? */
export async function checkWalletExist(wallet_id: any) {
  const supabase = createClient();

  const { data } = await supabase.from("profiles").select("*").eq("wallet_id", wallet_id);
  if (data && data?.length > 0) {
    return true;
  } else {
    return false;
  }
}

/* UPDATE PROFILE */
export async function updateProfileWallet(wallet_id: any, wallet_sign_hash: string, wallet_sign_timestamp: string) {
  const supabase = createClient();

  //get user from supabase db
  const { data, error } = await supabase.auth.getUser();

  //if user not found
  if (error || !data?.user) {
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

/* RESET PROFILE */
export async function resetProfileWallet() {
  const supabase = createClient();

  //get user from supabase db
  const { data, error } = await supabase.auth.getUser();

  //if user not found
  if (error || !data?.user) {
    return { user: data, error: error };
  } else {
    //otherwise update user profile using user ID
    const { error } = await supabase
      .from("profiles")
      .update({
        wallet_id: null,
        wallet_sign_hash: null,
        wallet_sign_timestamp: null,
      })
      .eq("id", data.user.id);

    if (error) {
      console.log(error);
    }
  }
}
