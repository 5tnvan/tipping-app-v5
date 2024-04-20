"use server";

import { redirect } from "next/navigation";
import { createClient } from "~~/utils/supabase/server";

/* LOGIN ACTIONS */

/* LOG IN */
export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error();
  }

  console.log("login success");
}

export async function forgotPassword(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
  };

  const { error } = await supabase.auth.resetPasswordForEmail(data.email);

  if (error) {
    throw new Error();
  }

  console.log("sent email password reset success");
}

export async function resetPassword(formData: FormData) {
  const supabase = createClient();

  const data = formData.get("password") as string;
  console.log("password", data);

  const { error } = await supabase.auth.updateUser({
    password: data,
  });

  if (error) {
    console.log(error);
    throw new Error();
  }

  console.log("password reset success");
}

/* LOGOUT */
export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    throw new Error("Logout failed"); // Explicitly throw an error here
  } else {
    redirect("/");
  }
}
