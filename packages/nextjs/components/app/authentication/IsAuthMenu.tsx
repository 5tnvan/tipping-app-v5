import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "~~/app/login/actions";
import { LoginIcon } from "~~/components/assets/LoginIcon";

export const IsAuthMenu = ({ profile, refetch }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenu = () => {
    const dropdown = document.getElementById("wildpay-is-auth-menu");
    dropdown?.removeAttribute("open");
  };

  const handleLogout = () => {
    logout();
    refetch();
  };

  return (
    <>
      <details id="wildpay-is-auth-menu" className="dropdown z-20 custom-is-auth-menu absolute dropdown-end">
        <summary className="m-1 btn btn-primary">
          <LoginIcon />
          {profile.username}
        </summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li>
            <div
              onClick={() => {
                router.push("/profile/view");
                handleMenu();
              }}
            >
              My Profile
            </div>
          </li>
          <li>
            <div
              onClick={() => {
                router.push("/settings");
                handleMenu();
              }}
            >
              My Settings
            </div>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </details>
      {/* <div
        id="wildpay-is-auth-menu"
        className={`dropdown dropdown-end z-20 custom-is-auth-menu absolute ${isDropdownOpen ? "dropdown-open" : ""}`}
      >
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 btn-primary"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <LoginIcon />
          {profile.username}
        </div>
        <ul tabIndex={0} className="dropdown-content z-20 menu p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <div onClick={() => router.push("/profile/view")}>My Profile</div>
          </li>
          <li>
            <div onClick={() => router.push("/settings")}>My Settings</div>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div> */}
    </>
  );
};
