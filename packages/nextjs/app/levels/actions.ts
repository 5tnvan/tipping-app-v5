"use server";

import { fetchInviteByID } from "~~/utils/app/fetch/fetchInvites";
import { fetchLevels } from "~~/utils/app/fetch/fetchLevels";
import { fetchUser } from "~~/utils/app/fetch/fetchUser";
import { createClient } from "~~/utils/supabase/server";

/* LOG IN */
export async function unlockLevel(invite_id: any) {
  let previousLevel;
  let currentLevel;

  const supabase = createClient();
  const userData = await fetchUser();
  const levels = await fetchLevels();
  const invite = await fetchInviteByID(invite_id);

  console.log("levels", levels);
  console.log("invite", invite);

  if (levels?.length == 0 && invite.code[0].type == 1) {
    previousLevel = true;
    currentLevel = false;
  } else {
    //find if previous level exists
    if (levels?.find((item: any) => item.level === invite.code[0].type - 1)) {
      previousLevel = true;
    }

    //find if current level exists
    if (levels?.find((item: any) => item.level === invite.code[0].type)) {
      currentLevel = true;
    }
  }

  //unlock
  if (previousLevel && !currentLevel) {
    const { data, error } = await supabase
      .from("levels")
      .upsert({ user_id: userData.user?.id, level: invite.code[0].type })
      .select();

    if (!error) {
      await supabase.from("invites").update({ claimed_by: userData.user?.id }).eq("id", invite_id); //update claimed by
    }

    if (error) throw new Error();
    return data;
  }
}
