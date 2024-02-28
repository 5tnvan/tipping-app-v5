// useUsernameAvailability.ts
import { useEffect, useState } from "react";
import { createClient } from "~~/utils/supabase/client";

export async function isUsernameTaken(usernameToCheck: string) {

  const supabase = createClient();

  const { data } = await supabase.from("profiles").select("*").eq("username", usernameToCheck);

  if(data?.length >= 1) {
    return true;
  }
  return false;
}

export function useUsernameAvailability(username: string) {
  // HOOK: useState
  const [availability, setAvailability] = useState<[string, string, string]>(["", "badge-info", "btn-disabled"]);

  // HOOK: useEffect, perform a side effect when the username variable changes.
  useEffect(() => {
    (async () => {
      let warningText = "";
      let badgeClass = "";
      let btnClass = "btn-disabled";

      if (username.length === 0) {
        warningText = "";
      } else if (username.length < 4) {
        warningText = "Type more";
        badgeClass = "badge-warning";
      } else {
        const taken = await isUsernameTaken(username);
        warningText = taken ? "Taken" : "Available";
        badgeClass = taken ? "badge-error" : "badge-success";
        btnClass = taken ? "btn-disabled" : "";
      }

      setAvailability([warningText, badgeClass, btnClass]);
    })();
  }, [username]);

  return availability;
}
