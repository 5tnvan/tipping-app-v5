"use server";

import { fetchUser } from "~~/utils/app/fetch/fetchUser";
import { createClient } from "~~/utils/supabase/server";

export async function insertPoke(user_id: any) {
  const supabase = createClient();
  const user = await fetchUser();
  const { error } = await supabase.from("pokes").insert({ user_id: user_id, poked_by: user.user?.id });
  if (error) {
    console.log(error);
  } else {
    return true;
  }
}
