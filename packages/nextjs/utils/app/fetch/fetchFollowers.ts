"use server";

import { fetchUser } from "./fetchUser";
import { createClient } from "~~/utils/supabase/server";

/**
 * FETCH: fetchFollowers()
 * DB: supabase
 * TABLE: none
 * RETURN: { followersData }
 **/

export const fetchFollowers = async (profile_id: string) => {
  const supabase = createClient();
  const userData = await fetchUser();
  const followersData = { followed: false, followers: <any>[], followersCount: 0, following: <any>[], followingCount: 0 };

  try {
    // Followed?
    const { data: followedData } = await supabase
      .from("followers")
      .select("following_id")
      .eq("following_id", profile_id)
      .eq("follower_id", userData.user?.id);

    if (followedData && followedData?.length > 0) {
      followersData.followed = true;
    }

    // Followers
    const { data: profileFollowersData } = await supabase
      .from("followers")
      .select("follower_id")
      .eq("following_id", profile_id);

    if (profileFollowersData) {
      // build array
      const profileIDs = profileFollowersData.map(item => item.follower_id);

      // Fetch profile data for each ID
      const { data: profilesData } = await supabase.from("profiles").select(`
      id,
      username, 
      avatar_url,
      wallet_id,
      profile_bios ( id )
    `).in("id", profileIDs);

      followersData.followers = profilesData || [];
      followersData.followersCount = profilesData?.length || 0;
    }

    // Following
    const { data: profileFollowingData } = await supabase
      .from("followers")
      .select("following_id")
      .eq("follower_id", profile_id);

    if (profileFollowingData) {
      // Extract profile IDs from the result
      const profileIDs = profileFollowingData.map(item => item.following_id);

      // Fetch profile data for each ID
      const { data: profilesData } = await supabase.from("profiles").select(`
      id,
      username, 
      avatar_url,
      wallet_id,
      profile_bios ( id )
    `).in("id", profileIDs);

      // Set 'following' to an array of profiles
      followersData.following = profilesData || [];
      followersData.followingCount = profilesData?.length || 0;
    }
  } catch (error) {
    console.error("Error fetching followers data:", error);
  }

  return followersData;
};

/**
 * FETCH: fetchFollowers()
 * DB: supabase
 * TABLE: none
 * RETURN: { followersData }
 **/

export const fetchFollowersWithRange = async (profile_id: string) => {
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
