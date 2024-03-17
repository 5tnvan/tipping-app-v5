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
  // console.log("server:fetchSession(): " + JSON.stringify(data, null, 2));
  console.log("server:fetchSession()");

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
  console.log("server:fetchUser()");
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
  console.log("server:fetchProfile()");

  if (userData) {
    const { data: profileData } = await supabase.from("profiles").select().eq("id", userData.user?.id);
    return profileData?.[0] ?? null;
  } else {
    return null;
  }
};

/**
 * FETCH: fetchPublicProfile(username)
 * DB: supabase
 * TABLE: "profiles"
 **/

export const fetchPublicProfile = async (username: string) => {
  const supabase = createClient();
  const { data: profileData } = await supabase.from("profiles").select("*").eq("username", username);
  console.log("server:fetchPublicProfile()");
  return profileData?.[0];
};

/**
 * FETCH: fetchPublicProfile(username)
 * DB: supabase
 * TABLE: "profiles"
 **/

export const fetchPublicProfileFromId = async (id: string) => {
  const supabase = createClient();
  console.log("server:fetchPublicProfileId()");
  const { data: profileData } = await supabase.from("profiles").select("*").eq("id", id);

  return profileData?.[0].username ?? null;
};

/**
 * FETCH: fetchPublicProfile(username)
 * DB: supabase
 * TABLE: "profiles"
 **/

export const fetchPublicProfileFromWalletId = async (wallet_id: string) => {
  const supabase = createClient();
  console.log("server:fetchPublicProfileFromWalletId(), id: ", wallet_id);

  const { data: profileData, error } = await supabase.from("profiles").select("*").ilike("wallet_id", wallet_id);
  console.log("server:fetchPublicProfileFromWalletId(), profileData: ", profileData);
  if (error) console.log(error);
  return profileData?.[0] ?? null;
};
