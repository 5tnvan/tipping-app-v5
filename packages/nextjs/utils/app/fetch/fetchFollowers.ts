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
    // Check if the profile is followed by the authenticated user
    const { data: followedData } = await supabase
      .from("followers")
      .select("following_id")
      .eq("following_id", profile_id)
      .eq("follower_id", userData.user?.id);

    // If there is data, set 'followed' to true
    if (followedData && followedData?.length > 0) {
      followersData.followed = true;
    }

    // Fetch data of profile followers and count how many followers
    const { data: profileFollowersData } = await supabase
      .from("followers")
      .select("follower_id")
      .eq("following_id", profile_id);

    // If there is data, set 'followers' and 'followersCount'
    if (profileFollowersData) {
      // Extract profile IDs from the result
      const profileIDs = profileFollowersData.map(item => item.follower_id);

      // Fetch profile data for each ID
      const { data: profilesData } = await supabase.from("profiles").select().in("id", profileIDs);

      followersData.followers = profilesData || [];
      followersData.followersCount = profilesData?.length || 0;
    }

    // Fetch data of profile following and count how many following
    const { data: profileFollowingData } = await supabase
      .from("followers")
      .select("following_id")
      .eq("follower_id", profile_id);

    // If there is data, set 'following' and 'followingCount'
    if (profileFollowingData) {
      // Extract profile IDs from the result
      const profileIDs = profileFollowingData.map(item => item.following_id);

      // Fetch profile data for each ID
      const { data: profilesData } = await supabase.from("profiles").select().in("id", profileIDs);

      // Set 'following' to an array of profiles
      followersData.following = profilesData || [];
      followersData.followingCount = profilesData?.length || 0;
    }
    console.log("server:fetchFollowers()");
  } catch (error) {
    console.error("Error fetching followers data:", error);
  }

  return followersData;
};
