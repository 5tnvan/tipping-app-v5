"use server";

import { createClient } from "~~/utils/supabase/server";

/**
 * FETCH: fetchSession()
 * DB: supabase
 * TABLE: none
 * RETURN: { data }
 **/

export const fetchSession = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.log(error);
    return null;
  } else {
    return data;
  }
};

/**
 * FETCH: fetchUser()
 * DB: supabase
 * TABLE: "auth.user"
 * RETURN: { data }
 **/

export const fetchUser = async () => {
  const supabase = createClient();
  //fetch user from supabase db
  const { data: userData } = await supabase.auth.getUser();
  return userData;
};

/**
 * FETCH: fetchProfile()
 * DB: supabase
 * TABLE: "profiles"
 **/

export const fetchProfile = async () => {
  const supabase = createClient();
  const userData = await fetchUser();

  if (userData) {
    const { data: profileData } = await supabase.from("profiles").select().eq("id", userData.user?.id);
    return profileData?.[0] ?? null;
  } else {
    return null;
  }
};

/**
 * FETCH: fetchProfiles()
 * DB: supabase
 * TABLE: "profiles"
 **/

export const fetchProfiles = async () => {
  const supabase = createClient();
  const { data: profileData } = await supabase.from("profiles").select("*").order("id", { ascending: false });
  return profileData;
};

/**
 * FETCH: fetchPublicProfile(username)
 * DB: supabase
 * TABLE: "profiles"
 **/

export const fetchPublicProfile = async (username: string) => {
  const supabase = createClient();
  const { data: profileData } = await supabase.from("profiles").select("*").eq("username", username);
  return profileData?.[0];
};

/**
 * FETCH: fetchPublicProfileMatchingWith(username)
 * DB: supabase
 * TABLE: "profiles"
 **/

export const fetchPublicProfileMatchingWith = async (username: string) => {
  const supabase = createClient();
  const { data: profileData } = await supabase.from("profiles").select("*").like("username", `${username}%`);
  console.log("profileData", profileData);
  return profileData;
};

/**
 * FETCH: fetchPublicProfileFromId(id)
 * DB: supabase
 * TABLE: "profiles"
 **/

export const fetchPublicProfileFromId = async (id: string) => {
  const supabase = createClient();
  const { data: profileData } = await supabase.from("profiles").select("*").eq("id", id);

  return profileData?.[0].username ?? null;
};

/**
 * FETCH: fetchPublicProfileFromWalletId(wallet_id)
 * DB: supabase
 * TABLE: "profiles"
 **/

export const fetchPublicProfileFromWalletId = async (wallet_id: string) => {
  const supabase = createClient();

  const { data: profileData, error } = await supabase.from("profiles").select("*").ilike("wallet_id", wallet_id);
  if (error) console.log(error);
  return profileData?.[0] ?? null;
};
