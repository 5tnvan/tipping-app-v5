import { cookies } from "next/headers";
import { Signup } from "~~/components/app/authentication/Signup";
import { CopyIcon } from "~~/components/assets/CopyIcon";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

export default function SignupNewPage() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("wildpay-username");
  console.log(cookie);

  return (
    <>
      <div id="sign-up-new" className="z-10 flex flex-col grow justify-center pb-10">
        <div className="text-3xl mb-5 custom-text-blue font-semibold">{"Sign up."}</div>
        {/* Scroll Snap */}
        <div className="scr mb-6 pl-6 pr-6">
          {/* Card 3 */}
          <div className="scr-item custom-bg-image-01 flex items-center relative">
            <div className=" text-6xl font-black custom-difference-blend">{cookie?.value}</div>
            <div className="absolute url flex custom-bg-blue pt-2 pb-2 pr-3 pl-3 text-white rounded-full text-sm items-center">
              <div className="mr-2">wildpay.eth/{cookie?.value}</div>
              <CopyIcon />
            </div>
          </div>
        </div>
        <Signup />
      </div>
    </>
  );
}
