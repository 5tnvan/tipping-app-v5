"use server";

import { createClient } from "~~/utils/supabase/server";

export async function generateInvite() {
  const supabase = createClient();

  //get user from supabase db
  const { data } = await supabase.auth.getUser();

  const { data: invite, error } = await supabase
    .from("invites")
    .upsert({
      user_id: data.user?.id,
      type: 1,
    })
    .select();

  if (error) {
    console.log(error);
    throw new Error();
  }

  return invite;
}
