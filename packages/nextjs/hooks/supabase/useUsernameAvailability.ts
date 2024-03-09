import { createClient } from "~~/utils/supabase/client";

export async function isUsernameTaken(username: string) {
  const supabase = createClient();
  const { data } = await supabase.from("profiles").select("*").eq("username", username);

  return !!(data?.length ?? 0);
}
