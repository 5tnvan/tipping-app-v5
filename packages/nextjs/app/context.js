"use client";

import { createContext } from "react";

const AppContext = createContext();
const PublicContext = createContext();
const FollowersContext = createContext();
const PublicFollowersContext = createContext();
const NotificationContext = createContext();
const ComponentsContext = createContext();

export { AppContext, PublicContext, FollowersContext, PublicFollowersContext, NotificationContext, ComponentsContext };
