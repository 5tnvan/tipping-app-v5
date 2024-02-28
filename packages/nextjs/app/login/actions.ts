"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "~~/utils/supabase/server";

/* LOGIN ACTIONS */

/* LOG IN */
export async function login(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  console.log('you here');

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/profile/view");
}

/* SIGN UP */
export async function signup(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const choosenUsername = cookieStore.get("choosenUsername");

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        username: "",
      },
    },
  };

  if (choosenUsername != undefined) {
    console.log("signup:" + choosenUsername.value);

    data.options.data.username = choosenUsername.value;
  }
  console.log(data);
  const { error } = await supabase.auth.signUp(data);
  cookieStore.delete("choosenUsername");
  console.log("deleted:" + choosenUsername);

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect("/");
}

/* LOGOUT */
export async function logout() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  redirect("/");
}
