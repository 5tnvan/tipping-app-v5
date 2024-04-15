"use client";

import { createContext } from "react";

const AppContext = createContext();
const PublicContext = createContext();
const FollowersContext = createContext();
const NotificationContext = createContext();

export { AppContext, PublicContext, FollowersContext, NotificationContext };
