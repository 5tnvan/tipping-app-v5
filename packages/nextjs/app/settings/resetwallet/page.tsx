"use client";

import React, { useState } from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { confirmPassword } from "../../login/actions";
import { resetProfileWallet } from "../actions";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { AuthUserContext } from "~~/app/context";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

export default function ResetWalletPage() {
  const router = useRouter();
  const { isAuth, user, refetchAuthUser } = useContext(AuthUserContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState<any>();

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleResetWallet = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const error = await confirmPassword(user.email, formData);

    if (!error) {
      setIsProcessing(false);
      setPasswordError("");
      await resetProfileWallet();
      setSuccess("Success. You reset your wallet.");
      setTimeout(() => {
        refetchAuthUser();
        router.back();
      }, 100);
    } else {
      console.log(error);
      setIsProcessing(false);
      setError(error);
      // setError("Authentication failed. Please try again");
    }
  };

  if (isAuth == "yes") {
    return (
      <>
        <form onSubmit={handleResetWallet}>
          <div id="wildpay-is-auth-settings" className="profile mt-5 mb-5 ml-6 mr-6 z-10">
            {/* CTA BUTTON */}
            <div id="wildpay-cta" className="mb-20 z-1 relative">
              <button className="btn w-full text-base btn-primary" onClick={() => router.back()}>
                Back to Settings
              </button>
            </div>
            <div className="font-semibold text-3xl mb-5">{"Confirm your password"}</div>
            {/* Input */}
            <label className="input input-bordered flex items-center gap-2 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                name="password"
                placeholder="Current password"
                value={password}
                className="bg-white text-black grow"
                onChange={handlePasswordChange}
              />
            </label>
            {passwordError && <div className="custom-warning text-red-600 pb-2 pl-2">{passwordError}</div>}
            <button
              type="submit"
              className="btn btn-secondary text-base w-full"
              onClick={() => setIsProcessing(true)}
              disabled={success != undefined}
            >
              Confirm {isProcessing && <span className="loading loading-ring loading-md"></span>}
            </button>

            {error && (
              <div role="alert" className="flex justify-between text-sm items-center alert alert-error mt-3">
                <div className="flex items-center">
                  <div className="mr-1">
                    <XCircleIcon width={18} />
                  </div>
                  <span>{error}</span>
                </div>
                <div className="cursor-pointer">
                  <XMarkIcon width={18} onClick={() => setError(null)} />
                </div>
              </div>
            )}
            {success && (
              <div role="alert" className="flex justify-between items-center alert alert-success mt-3">
                <div className="flex items-center">
                  <div className="mr-1">
                    <CheckCircleIcon width={18} />
                  </div>
                  <span>{success}</span>
                </div>
                <div className="cursor-pointer">
                  <XMarkIcon width={18} onClick={() => setSuccess(null)} />
                </div>
              </div>
            )}
          </div>
        </form>
      </>
    );
  }
}
