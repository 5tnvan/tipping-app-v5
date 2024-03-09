"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "~~/utils/supabase/server";

/**
 * ACTION: setUsernameCookie(formData)
 **/
export async function setUsernameCookie(formData: FormData) {
  const hr = new Date();
  hr.setTime(hr.getTime() + 60 * 60 * 1000); // 1 hour from now in milliseconds

  const cookieStore = cookies();
  const username = formData.get("username") as string;

  cookieStore.set("wildpay-username", username, { expires: hr });
  redirect("/signup/new");
}

/**
 * ACTION: signup(formData)
 **/
export async function signup(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient();
  const cookie = cookieStore.get("wildpay-username");

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

  if (cookie != undefined) {
    data.options.data.username = cookie.value;
  }
  const { error } = await supabase.auth.signUp(data);
  cookieStore.delete("wildpay-username");

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect("/signup/verify");
}
