"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AppContext, NotificationContext } from "../context";
import { updateRead } from "./actions";
import { TimeAgo } from "~~/components/app/TimeAgo";
import { Avatar } from "~~/components/app/authentication/Avatar";
import "~~/styles/app-reuse.css";
import "~~/styles/app.css";
import { fetchPublicProfileFromId } from "~~/utils/app/fetch/fetchUser";

export default function NotificationPage() {
  const { isAuth } = useContext(AppContext);
  const { notifications } = useContext(NotificationContext);
  const [notificationsWithProfiles, setNotificationsWithProfiles] = useState<any>();

  useEffect(() => {
    const fetchNotificationsWithProfiles = async () => {
      const updated = await Promise.all(
        notifications?.map(async (notification: any) => {
          const profile = await fetchPublicProfileFromId(notification.follower_id);
          return { ...notification, profile };
        }),
      );
      setNotificationsWithProfiles(updated);
    };
    fetchNotificationsWithProfiles();
  }, [notifications]);

  const handleRead = (notification_id: any) => {
    updateRead(notification_id);
  };

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
          <span className="text-primary text-4xl">Notifications</span>
          {/* <span className="text-base mt-1">({notifications?.length})</span> */}
        </div>
        <div id="" className="wildui-notification-scroll overflow-scroll z-10 pt-6 pl-6 pr-6">
          {notificationsWithProfiles?.map((notification: any) => (
            <div key={notification.id} className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Avatar profile={notification.profile[0]} width={8} ring={false} />
                <Link
                  href={"/" + notification.profile[0].username}
                  className="font-semibold"
                  onClick={() => handleRead(notification.id)}
                >
                  {notification.profile[0].username}
                </Link>
                followed you
                <div className="text-neutral-500 text-primary">
                  <TimeAgo timestamp={notification.follower_created_at} />
                </div>
              </div>
              <div className="flex gap-1">
                {/* <Link href="/" className="btn btn-sm btn-accent">
                  Follow Back
                </Link> */}
                {notification.follower_read === false && (
                  <div className="btn btn-sm btn-accent" onClick={() => handleRead(notification.id)}>
                    Mark as Read
                  </div>
                )}
                {notification.follower_read === true && (
                  <Link href={"/" + notification.profile[0].username} className="btn btn-sm btn-neutral">
                    View
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
