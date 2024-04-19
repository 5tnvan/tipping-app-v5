"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppContext, NotificationContext } from "../context";
import { ProfileWithReveal } from "~~/components/app/ProfileWithReveal";
import { TimeAgo } from "~~/components/app/TimeAgo";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";

export default function NotificationPage() {
  const router = useRouter();
  const { isAuth } = useContext(AppContext);
  const { isLoadingNotifications, notifications } = useContext(NotificationContext);

  if (isAuth == "no") {
    return (
      <>
        {/* CONTENT */}
        <div id="wildpay-is-not-auth" className="z-10 pt-28 pl-6 pr-6">
          <div className="font-semibold text-3xl mb-5">{"You are not logged in."}</div>
          <Link href="/login" className="btn text-base mb-3 w-full">
            {"Go to login"}
          </Link>
        </div>
      </>
    );
  }

  if (isAuth == "yes") {
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
                <ProfileWithReveal profile_id={notification.follower_id} notification_id={notification.id} />
                started following you
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
