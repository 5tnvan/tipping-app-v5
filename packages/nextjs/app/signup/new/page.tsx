import { cookies } from "next/headers";
import { Authentication } from "../../../components/app/authentication/Authentication";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

export default function LoginNewPage() {
  const cookieStore = cookies();
  const choosenUsername = cookieStore.get("choosenUsername");

  return (
    <>
      {/* CONTENT */}
      <div id="sign-up-new" className="z-10">
        {/* Hero: */}
        <div className="text-3xl mb-5 custom-text-blue font-semibold">{"Sign up."}</div>

        {/* Scroll Snap */}
        <div className="scr mb-6">
          {/* Card 3 */}
          <div className="scr-item custom-bg-image-01"></div>
          <div className="scr-item custom-bg-image-01"></div>
          <div className="scr-item custom-bg-image-01"></div>
        </div>

        {/* Input */}
        <Authentication type="signup" value="Sign Up" additional="no" />
      </div>
    </>
  );
}
