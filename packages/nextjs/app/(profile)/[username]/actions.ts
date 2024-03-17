"use server";

import { createClient } from "~~/utils/supabase/server";

/* INSERT FOLLOWING */
export async function insertFollowing(following_id: any) {
  //get follower_id, that's the currently authenticated user
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data) {
    //insert to db: followers table
    const { error } = await supabase
      .from("followers")
      .insert({ follower_id: data.user?.id, following_id: following_id });
    if (error) console.log(error);
  }
}

/* DELETE FOLLOWING */
export async function deleteFollowing(following_id: string) {
  console.log("Im here");
  //get follower_id, that's the currently authenticated user
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  console.log("Data:", data);

  if (data) {
    //delete from db: followers table
    console.log(data.user?.id, ",", following_id);
    const { error } = await supabase
      .from("followers")
      .delete()
      .eq("follower_id", data.user?.id)
      .eq("following_id", following_id);

    if (error) {
      console.log(error);
      throw new Error("Login failed"); // Explicitly throw an error here
    }

    console.log("end of db delete");
  }
}
