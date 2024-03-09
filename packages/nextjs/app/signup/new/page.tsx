import { cookies } from "next/headers";
import { CardWithUsername } from "~~/components/app/CardWithUsername";
import { Signup } from "~~/components/app/authentication/Signup";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

export default function SignupNewPage() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("wildpay-username");
  console.log(cookie);

  return (
    <>
      <div id="sign-up-new" className="z-10 flex flex-col grow justify-center">
        <div className="text-3xl mb-5 custom-text-blue font-semibold">{"Sign up."}</div>
        <CardWithUsername username={cookie?.value} />
        <Signup />
      </div>
    </>
  );
}
