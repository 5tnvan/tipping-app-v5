import { cookies } from "next/headers";
import { Signup } from "~~/components/app/authentication/Signup";
import { BaseIcon } from "~~/components/assets/BaseIcon";
import { CopyIcon } from "~~/components/assets/CopyIcon";
import { EthIcon } from "~~/components/assets/EthIcon";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

export default function SignupNewPage() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("wildpay-username");
  console.log(cookie);

  return (
    <>
      <div id="sign-up-new" className="z-10 flex flex-col grow justify-center pl-6 pr-6 pb-10">
        <div className="text-3xl mb-5 custom-text-blue font-semibold">{"Sign up."}</div>
        {/* Scroll Snap */}
        <div className="scr mb-6">
          {/* Card 3 */}
          <div className="scr-item custom-bg-image-01 flex items-center relative">
            <div className="absolute network flex">
              <div className="btn hover:bg-fuchsia-500 font-medium h-6 min-h-6 gap-0 bg-fuchsia-400 px-2 mr-1">
                <EthIcon width={14} height={14} fill="#3C3C3C" />
                ethereum
              </div>
              <div className="btn hover:bg-fuchsia-500 font-medium flex h-6 min-h-6 gap-0 bg-fuchsia-400 px-2">
                <BaseIcon width={10} height={10} fill="#3C3C3C" />
                <span className="pl-1">base</span>
              </div>
            </div>
            <div className=" text-6xl font-black custom-difference-blend">{cookie?.value}</div>
            <div className="absolute url flex btn btn-accent h-8 min-h-8 bg-gradient-to-r from-cyan-600 via-lime-500 border-0">
              <div className="">wildpay.app/{cookie?.value}</div>
              <CopyIcon />
            </div>
          </div>
        </div>
        <Signup />
      </div>
    </>
  );
}
