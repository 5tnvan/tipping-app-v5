"use server";

import { createClient } from "~~/utils/supabase/server";

/* UPDATE USER SOCIAL */
export async function updateProfileSocial(user: any, social: any, inputVal: any) {
  const supabase = createClient();

  //get user from supabase db
  const { data } = await supabase.auth.getUser();
  console.log(JSON.stringify(data, null, 2));

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
export async function updateProfileAvatar(url: any) {
  const supabase = createClient();

  //get user from supabase db
  const { data, error } = await supabase.auth.getUser();

  console.log(JSON.stringify(data, null, 2));

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
