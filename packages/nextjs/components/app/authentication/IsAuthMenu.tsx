import React, { useContext, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "./Avatar";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { AccountingContext, AppContext, FollowersContext } from "~~/app/context";
import { logout } from "~~/app/login/actions";
import { useOutsideClick } from "~~/hooks/scaffold-eth/useOutsideClick";

export const IsAuthMenu = () => {
  const router = useRouter();

  const { profile, refetchAuth } = useContext(AppContext);
  const { refetchFollowers } = useContext(FollowersContext);
  const { refetchAccounting } = useContext(AccountingContext);

  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const closeDropdown = () => {
    dropdownRef.current?.removeAttribute("open");
  };
  useOutsideClick(dropdownRef, closeDropdown);

  const handleLogout = async () => {
    try {
      await logout();
      // Remove all app context after logout
      // Wait for 1 seconds
      setTimeout(async () => {
        await refetchAuth();
        await refetchFollowers();
        await refetchAccounting();
      }, 1000); // 3000 milliseconds = 3 seconds
    } catch (error) {
      console.error("Logout error:", error);
      router.push("error");
    }
  };

  return (
    <>
      <details ref={dropdownRef} className="dropdown dropdown-end z-20 wildui-menu absolute ">
        <summary className="btn btn-neutral">
          <Avatar profile={profile} width="8" ring={false} />
          <ChevronDownIcon width={12} />
        </summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li>
            <Link href="/profile/view" onClick={closeDropdown}>
              My Profile
            </Link>
          </li>
          <li>
            <Link href="/settings" onClick={closeDropdown}>
              My Settings
            </Link>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </details>
    </>
  );
};
