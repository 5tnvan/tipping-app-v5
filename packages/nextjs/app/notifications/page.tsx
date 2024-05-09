"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext, AuthUserNotificationContext } from "../context";
import { ProfileRevealNotification } from "~~/components/app/ProfileRevealNotification";
import { TimeAgo } from "~~/components/app/TimeAgo";

export default function NotificationPage() {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);
  const { isLoadingNotifications, notifications } = useContext(AuthUserNotificationContext);

  if (isAuthenticated == "yes") {
    return (
      <>
        <div className="flex justify-between items-center font-semibold mt-6 mb-3 pt-10 pl-6 pr-6">
          <button className="btn btn-sm btn-primary" onClick={() => router.back()}>
            Back
          </button>
          <span className="text-primary text-4xl flex items-center">
            {isLoadingNotifications && <span className="loading loading-ring loading-md"></span>}
            <span className="ml-2">Notifications</span>
          </span>
        </div>
        <div id="" className="wildui-notification-scroll flex flex-col gap-5 overflow-scroll z-10 pt-3 pl-6 pr-6 pb-10">
          {notifications?.map((notification: any) => (
            <div
              key={notification.id}
              className={`flex items-center justify-between ${!notification.follower_read ? "font-semibold" : ""}`}
            >
              <div className="flex items-center">
                <ProfileRevealNotification profile_id={notification.follower_id} notification_id={notification.id} />
                <span className="ml-2">started following you</span>
              </div>
              <div className="flex gap-1 text-neutral-500">
                <TimeAgo timestamp={notification.follower_created_at} />
              </div>
            </div>
          ))}
          {notifications?.length === 0 && "You are all caught up!"}
        </div>
      </>
    );
  }
}
