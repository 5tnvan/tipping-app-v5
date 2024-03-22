"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "~~/utils/supabase/server";

// Import the regex pattern for username validation
const usernameRegex = /^[a-z][a-z0-9_]{2,15}$/i;

/**
 * ACTION: setUsernameCookie(formData)
 **/
export async function setUsernameCookie(formData: FormData) {
  const hr = new Date();
  hr.setTime(hr.getTime() + 60 * 60 * 1000); // 1 hour from now in milliseconds

  const cookieStore = cookies();
  const username = formData.get("username") as string;

  cookieStore.set("wildpay-username", username, { expires: hr });
  console.log("redirecting");
  redirect("/signup/new");
}

/**
 * ACTION: signup(formData)
 **/
export async function signup(formData: { email: string; password: string }) {
  const cookieStore = cookies();
  const supabase = createClient();
  const cookie = cookieStore.get("wildpay-username");

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        username: "",
      },
    },
  };

  if (cookie != undefined && usernameRegex.test(cookie.value)) {
    data.options.data.username = cookie.value;
    // Check if the username follows the specified pattern
  }
  if (cookie == undefined) {
    redirect("/error");
  }

  const { error } = await supabase.auth.signUp(data);
  cookieStore.delete("wildpay-username");

  if (error) {
    redirect("/error");
  }

  redirect("/signup/verify");
}
