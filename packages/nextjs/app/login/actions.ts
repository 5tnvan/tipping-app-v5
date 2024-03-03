"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";
import { createClient } from "~~/utils/supabase/server";

/* LOGIN ACTIONS */

/* LOG IN */
export async function login(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient();

  console.log("you are at login");

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log("there is a login error:" + error);
    redirect("/error");
  }

  console.log("login success");
  console.log("login success and cookie store: " + cookieStore);

  revalidatePath("/", "layout");
  redirect("/private");
}

/* SIGN UP */
export async function signup(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient();
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
  console.log("I'm at logout");
  const cookieStore = cookies();
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("There was an error at logout" + error);
    redirect("/error");
  }

  redirect("/getstarted");
}
