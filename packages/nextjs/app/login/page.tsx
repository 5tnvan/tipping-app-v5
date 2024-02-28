import { cookies } from "next/headers";
import { Authentication } from "./_components/Authentication";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

export default function LoginPage() {
  const cookieStore = cookies();
  const choosenUsername = cookieStore.get("choosenUsername");

  return (
    <>
      {/* CONTENT */}
      <div className="cont z-10">
        {/* Hero: */}
        <div className="font-semibold text-3xl">Welcome back</div>
        {/* Input */}
        <Authentication type="login" value="Login" linkSignUp="yes" linkLogin="no" />
      </div>
    </>
  );
}
