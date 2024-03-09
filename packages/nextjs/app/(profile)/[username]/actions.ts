"use server";

import { createClient } from "~~/utils/supabase/server";

/* INSERT FOLLOWERS */
export async function insertFollowing(following_id: string) {
  //get follower_id, that's the currently authenticated user
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (data) {
    //insert to db: followers table
    const { error } = await supabase
      .from("followers")
      .insert({ follower_id: data.user?.id, following_id: following_id });
    if (error) console.log(error);
  }
}
