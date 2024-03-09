// "use server";

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export async function claimLink(formData: FormData) {
//   const hr = new Date();
//   hr.setTime(hr.getTime() + 60 * 60 * 1000); // 1 hour from now in milliseconds

//   const cookieStore = cookies();
//   const username = formData.get("username") as string;

//   cookieStore.set("wildpay-username", username, { expires: hr });
//   redirect("/signup/new");
// }