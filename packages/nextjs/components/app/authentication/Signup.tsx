"use client";

import { useState } from "react";
import { signup } from "~~/app/signup/actions";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Perform email validation
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailError(isValidEmail ? "" : "Invalid email.");

    // Perform password validation
    const isValidPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    setPasswordError(isValidPassword ? "" : "Password is too short or too weak.");

    // Check if both email and password are valid before submitting
    if (!isValidEmail || !isValidPassword) {
      return;
    }

    // Call the signup action with the form data
    try {
      await signup({
        email: email, // Add 'email' property
        password: password, // Add 'password' property
      });
    } catch (error) {
      // Handle server-side errors, redirect to an error page, or provide a generic error message.
      console.error("Server-side error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
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
          {/* ... (Email input) */}
          <input
            type="text"
            name="email"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>

        {emailError && <div className="custom-warning text-red-600 pb-2 pl-2">{emailError}</div>}

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
          {/* ... (Password input) */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>

        {passwordError && <div className="custom-warning text-red-600 pb-2 pl-2">{passwordError}</div>}

        <button type="submit" className="btn btn-neutral text-base w-full" formAction={signup}>
          Sign Up
        </button>
      </form>
    </>
  );
};
