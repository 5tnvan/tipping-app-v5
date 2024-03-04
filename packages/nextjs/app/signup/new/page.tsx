import { cookies } from "next/headers";
import { Authentication } from "../../../components/app/authentication/Authentication";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";
import { CopyIcon } from "~~/components/assets/CopyIcon";

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
          <div className="scr-item custom-bg-image-01 flex items-center relative">
            <div className=" text-6xl font-black custom-difference-blend">{choosenUsername?.value}</div>
            <div className="absolute url flex custom-bg-blue pt-2 pb-2 pr-3 pl-3 text-white rounded-full text-sm items-center">
              <div className="mr-2">wildpay.eth/{choosenUsername?.value}</div>
              <CopyIcon />
            </div>
          </div>
        </div>

        {/* Input */}
        <Authentication type="signup" value="Sign Up" additional="no" />
      </div>
    </>
  );
}
