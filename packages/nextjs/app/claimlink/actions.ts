"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function claimLink(formData: FormData) {
  const cookieStore = cookies();
  const username = formData.get("username") as string;
  console.log(username);
  cookieStore.set("choosenUsername", username);
  console.log(cookieStore.get("choosenUsername"));
  redirect("/signup/new");
}
