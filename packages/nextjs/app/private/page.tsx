import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logout } from "../login/actions";
import { createClient } from "~~/utils/supabase/server";

export default async function PrivatePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.log("user not found");
    redirect("/login");
  }

  console.log(data.user.user_metadata);

  // Fetch user profile using user ID
  const { data: profileData, error: profileError } = await supabase.from("profiles").select().eq("id", data.user.id);

  if (profileError) {
    console.log("profile not found");
  }

  // Display user profile data
  return (
    <>
      <div>
        <p>Hello {data.user.email}</p>

        <p>User Profile:</p>
        <pre>{JSON.stringify(profileData, null, 2)}</pre>
      </div>
      <form>
        <button formAction={logout}>Logout</button>
      </form>
    </>
  );
}
