import { cookies } from "next/headers";
import { Authentication } from "../../login/_components/Authentication";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

export default function LoginNewPage() {
  const cookieStore = cookies();
  const choosenUsername = cookieStore.get("choosenUsername");

  return (
    <>
      {/* CONTENT */}
      <div className="cont z-10">
        {/* Hero: */}
        <div className="font-semibold text-3xl">{"Almost there..."}</div>
        <div className="text-3xl">
          <span className="special-bl">@{choosenUsername ? choosenUsername.value : null}</span> is now reserved
        </div>

        {/* Steps */}
        <ul className="steps steps-vertical lg:steps-vertical">
          <li className="step step-primary">Claim handle</li>
          <li className="step step-primary">Sign Up</li>
          <li className="step ">Ready to go</li>
        </ul>

        {/* Input */}
        <div className="font-semibold">{"Sign up with email:"}</div>
        <Authentication type="signup" value="Sign Up" additional="no" />
      </div>
    </>
  );
}
