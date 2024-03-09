"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "~~/utils/supabase/server";

/* LOGIN ACTIONS */

/* LOG IN */
export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  console.log("login actions");

  if (error) {
    redirect("/error");
  }

  console.log("login success");

  revalidatePath("/", "layout");
  // refetch();
  // redirect("/profile/view");
}

/* LOGOUT */
export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  redirect("/getstarted");
}
