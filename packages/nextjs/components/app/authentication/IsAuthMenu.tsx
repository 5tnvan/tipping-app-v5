import React, { useContext, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "./Avatar";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { AuthContext, AuthUserContext, FollowersContext, NotificationContext } from "~~/app/context";
import { logout } from "~~/app/login/actions";
import { useOutsideClick } from "~~/hooks/scaffold-eth/useOutsideClick";

export const IsAuthMenu = () => {
  const router = useRouter();

  //PARENTS CONTEXT
  const { refetchSession } = useContext(AuthContext);
  const { profile, refetchAuthUser } = useContext(AuthUserContext);
  const { refetchFollowers } = useContext(FollowersContext);
  const { notifications, refetchNotifications } = useContext(NotificationContext);

  //DROPDOWN
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const unreadNotifications = notifications?.filter((notification: any) => !notification.follower_read);
  const closeDropdown = () => {
    dropdownRef.current?.removeAttribute("open");
  };
  useOutsideClick(dropdownRef, closeDropdown);

  //ACTION: handle logout
  const handleLogout = async () => {
    try {
      await logout();
      await refetchAuthUser();
      await refetchSession();
      await refetchFollowers();
      await refetchNotifications();
    } catch (error) {
      console.error("Logout error:", error);
      router.push("error");
    }
  };

  return (
    <>
      <details ref={dropdownRef} className="dropdown dropdown-end z-20 wildui-menu absolute ">
        <summary className="btn btn-neutral relative">
          {unreadNotifications?.length > 0 && (
            <div className="notification-dot w-2.5 h-2.5 bg-red-600 rounded-full absolute z-20 top-7px"></div>
          )}
          {profile.profile_bios.length > 0 && <Avatar profile={profile} width={8} height={8} border={2} ring={9} gradient={"g-tropical"} />}
          {profile.profile_bios.length == 0 && <Avatar profile={profile} width={8} height={8} border={0} ring={8} gradient={"g-white"} />}
          <ChevronDownIcon width={12} />
        </summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li>
            <Link href="/notifications" onClick={closeDropdown} className="flex justify-between">
              <span>My Notifications</span>
              {unreadNotifications?.length > 0 && (
                <div className="text-neutral w-5 h-5 bg-red-600 text-center rounded-full">
                  {unreadNotifications?.length}
                </div>
              )}
            </Link>
          </li>
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
