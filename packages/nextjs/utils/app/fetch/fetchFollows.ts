"use server";

import { fetchUser } from "./fetchUser";
import { createClient } from "~~/utils/supabase/server";

/**
 * FETCH: fetchFollowsFromId()
 * DB: supabase
 * TABLE: none
 * RETURN: { followersData }
 **/

export const fetchFollowsFromId = async (profile_id: string) => {
  const supabase = createClient();
  const userData = await fetchUser();
  const followersData = { followed: false, followers: <any>[], following: <any>[] };

  //Followed?
  const { data: followedData } = await supabase
    .from("followers")
    .select("following_id")
    .eq("following_id", profile_id)
    .eq("follower_id", userData.user?.id);

  if (followedData && followedData?.length > 0) {
    followersData.followed = true;
  }

  // Followers
  const { data: followers } = await supabase
    .from("followers")
    .select("follower:follower_id(id, username, avatar_url, profile_bios(id))")
    .eq("following_id", profile_id)
    .order('created_at', { ascending: false })

  // Following
  const { data: following } = await supabase
    .from("followers")
    .select("following:following_id(id, username, avatar_url, wallet_id, profile_bios(id)))")
    .eq("follower_id", profile_id)
    .order('created_at', { ascending: false })

  followersData.followers = followers;
  followersData.following = following;

  return followersData;
};
