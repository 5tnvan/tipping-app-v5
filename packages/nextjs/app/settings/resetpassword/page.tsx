"use client";

import React, { useState } from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { resetPassword } from "../../login/actions";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { AuthUserContext } from "~~/app/context";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { isAuth } = useContext(AuthUserContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState<any>();

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleResetPassword = async (event: any) => {
    event.preventDefault();

    // Perform password validation
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    setPasswordError(isValidPassword ? "" : "Password is too short or too weak.");

    // Check if both email and password are valid before submitting
    if (!isValidPassword) {
      setIsProcessing(false);
      return;
    }
    try {
      const formData = new FormData(event.currentTarget);
      await resetPassword(formData);
      setIsProcessing(false);
      setPasswordError("");
      setSuccess("Success. You changed your password.");
      setTimeout(router.back, 100);
    } catch (error) {
      setIsProcessing(false);
      setError(error);
      // setError("Reset failed. Please try again");
    }
  };

  if (isAuth == "yes") {
    return (
      <>
        <form onSubmit={handleResetPassword}>
          <div id="wildpay-is-auth-settings" className="profile mt-5 mb-5 ml-6 mr-6 z-10">
            {/* CTA BUTTON */}
            <div id="wildpay-cta" className="mb-20 z-1 relative">
              <button className="btn w-full text-base btn-primary" onClick={() => router.back()}>
                Back to Settings
              </button>
            </div>
            <div className="font-semibold text-3xl mb-5">{"Reset your password"}</div>
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
                placeholder="New password"
                value={password}
                className="bg-white text-black grow"
                onChange={handlePasswordChange}
              />
            </label>
            {passwordError && <div className="custom-warning text-red-600 pb-2 pl-2">{passwordError}</div>}
            <button type="submit" className="btn btn-secondary text-base w-full" onClick={() => setIsProcessing(true)}>
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
