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

/* UPDATE PROFILE SOCIAL */
export async function updateProfileSocial(user, social, inputVal) {
  const supabase = createClient();

  //if user not found, redirect to login
  if (!user.id) {
    console.log("no user_id");
    return null;
  } else {
    //otherwise fetch user profile using user ID
    const { error } = await supabase
      .from("profiles")
      .update({ [social]: inputVal })
      .eq("id", user.id);

    if (error) {
      console.log(error);
    }
  }
}

/* UPDATE AVATAR */
export async function updateProfileAvatar(url) {
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
    const { error } = await supabase.from("profiles").update({ avatar_url: url }).eq("id", data.user.id);

    if (error) {
      console.log(error);
    }
  }
}
