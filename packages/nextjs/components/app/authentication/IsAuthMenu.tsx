import React, { useContext, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "./Avatar";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { AppContext } from "~~/app/context";
import { logout } from "~~/app/login/actions";
import { useOutsideClick } from "~~/hooks/scaffold-eth/useOutsideClick";

type Props = {
  refetch: any;
};

export const IsAuthMenu = ({ refetch }: Props) => {
  const router = useRouter();

  const { profile } = useContext(AppContext);

  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const closeDropdown = () => {
    dropdownRef.current?.removeAttribute("open");
  };
  useOutsideClick(dropdownRef, closeDropdown);

  const handleLogout = async () => {
    try {
      await logout();
      refetch();
    } catch (error) {
      console.error("Logout error:", error);
      router.push("error");
    }
  };

  return (
    <>
      <details ref={dropdownRef} className="dropdown dropdown-end z-20 custom-is-auth-menu absolute ">
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
