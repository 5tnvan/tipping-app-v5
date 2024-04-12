"use server";

import { createClient } from "~~/utils/supabase/server";

/* UPDATE USER SOCIAL LINKS */
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

/* GET PUBLIC URL */
export async function getPublicURL(filePath: any) {
  const supabase = createClient();
  const { data } = supabase.storage.from("avatars").getPublicUrl(`${filePath}`);
  return data;
}

/* CHECK IF FILES EXIST */
export async function checkFileExists(profile_id: any) {
  const supabase = createClient();
  const { data, error } = await supabase.storage.from("avatars").list(`${profile_id}`);

  if (error) {
    console.error(error);
    return { bool: false, data: null };
  }
  if (data.length == 0) {
    return { bool: false, data: null };
  }
  if (data.length > 0) {
    return { bool: true, data: data };
  }
}

/* UPLOAD PROFILE PIC */
export async function uploadProfileAvatar(file: any) {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  if (user.user) {
    const { data: paths, error } = await supabase.storage
      .from("avatars")
      .upload(`${user.user.id}/${Date.now()}`, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) console.log("upload", error);
    return paths;
  }
}

/* DELETE PROFILE PIC */
export async function deleteProfileAvatars(files: any) {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();
  if (user.user) {
    const filesToDelete = files.map((item: any) => `${user?.user?.id}/${item.name}`) || [];
    const { error } = await supabase.storage.from("avatars").remove(filesToDelete);
    if (error) console.log("delete", error);
  }
}

/* UPDATE AVATAR LINK */
export async function updateProfileAvatar(url: any) {
  const supabase = createClient();

  //get user from supabase db
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.log("updateProfileAvatar: ", error);
    return { error: error };
  } else {
    //update user avatar_url using user ID
    const { error } = await supabase.from("profiles").update({ avatar_url: url }).eq("id", data.user.id);

    if (error) {
      console.log(error);
    }
  }
}
