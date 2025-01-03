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
    throw new Error(error.message);
  }

  console.log("password reset success");
}

export async function confirmPassword(email: string, formData: FormData) {
  const supabase = createClient();

  const password = formData.get("password") as string;
  console.log("password", password);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data?.user?.id) {
    console.log(error);
    return error?.message || "Your current password is not valid. For safety concerns, you need to re-log";
  }

  console.log("password confirm success");
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

export async function signInWithGoogle() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `https://www.kinnectwallet.com/auth/callback?next=/home`,
    },
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect(data.url);
}
