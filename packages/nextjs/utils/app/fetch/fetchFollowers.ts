"use server";

import { fetchUser } from "./fetchUser";
import { createClient } from "~~/utils/supabase/server";

/**
 * FETCH: fetchSession()
 * DB: supabase
 * TABLE: none
 * RETURN: { data }
 **/

export const fetchFollowers = async (profile_id: string) => {
  // Initialize Supabase client
  const supabase = createClient();

  // Fetch authenticated user data
  const { userData } = await fetchUser();

  // Initialize an object to store follower-related data
  const followersData = { followed: false, followers: [], followersCount: 0, following: {}, followingCount: 0 };

  try {
    // Check if the profile is followed by the authenticated user
    const { data: followedData } = await supabase
      .from("followers")
      .select("following_id")
      .eq("following_id", profile_id)
      .eq("follower_id", userData.user?.id);

    // If there is data, set 'followed' to true
    if (followedData?.length > 0) {
      followersData.followed = true;
    }

    // Fetch data of profile followers and count how many followers
    const { data: profileFollowersData } = await supabase
      .from("followers")
      .select("follower_id")
      .eq("following_id", profile_id);

    // If there is data, set 'followers' and 'followersCount'
    if (profileFollowersData) {
      followersData.followers = profileFollowersData;
      followersData.followersCount = profileFollowersData.length;
    }

    // Fetch data of profile following and count how many following
    const { data: profileFollowingData } = await supabase
      .from("followers")
      .select("following_id")
      .eq("follower_id", profile_id);

    // If there is data, set 'following' and 'followingCount'
    console.log(profileFollowingData);
    if (profileFollowingData) {
      // Extract profile IDs from the result
      const profileIDs = profileFollowingData.map(item => item.following_id);

      // Fetch profile data for each ID
      const { data: profilesData } = await supabase.from("profiles").select().in("id", profileIDs);

      // Set 'following' to an array of profiles
      followersData.following = profilesData || [];
      followersData.followingCount = profilesData?.length || 0;
    }
  } catch (error) {
    console.error("Error fetching followers data:", error);
  }

  return followersData;
};