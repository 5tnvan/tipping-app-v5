"use client";

import React, { useState } from "react";
import { useContext } from "react";
import { forgotPassword } from "../actions";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { AuthContext } from "~~/app/context";

export default function ForgotPasswordPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<any>();
  const [success, setSuccess] = useState<any>();

  const handleForgotPassword = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      await forgotPassword(formData);
      setSuccess("Success. Follow the link in your email.");
      setIsProcessing(false);
    } catch (error) {
      setIsProcessing(false);
      setError("Send email failed. Please try again.");
    }
  };

  if (isAuthenticated == "no") {
    return (
      <>
        <form onSubmit={handleForgotPassword}>
          <div id="wild-pay-is-not-auth-log-in" className="z-10 pt-28 pl-6 pr-6">
            <div className="font-semibold text-3xl mb-5">{"Recover your password"}</div>
            {/* Input */}
            <label className="input input-bordered flex items-center gap-2 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" name="email" className="bg-white text-black grow" placeholder="Email" />
            </label>
            <button type="submit" className="btn btn-primary text-base w-full" onClick={() => setIsProcessing(true)}>
              Send password reset {isProcessing && <span className="loading loading-ring loading-md"></span>}
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
