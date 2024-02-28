import { cookies } from "next/headers";
import { Authentication } from "../login/_components/Authentication";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

export default function SignUpPage() {
  const cookieStore = cookies();
  const choosenUsername = cookieStore.get("choosenUsername");

  return (
    <>
      {/* CONTENT */}
      <div className="cont z-10">
        {/* Hero: */}
        <div className="font-semibold text-3xl">{"Create an account"}</div>

        {/* Input */}
        <Authentication type="signup" value="Sign Up" linkSignUp="no" linkLogin="yes" />
      </div>
    </>
  );
}
