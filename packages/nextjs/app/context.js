"use client";

import { createContext } from "react";

const PublicContext = createContext();
const FollowersContext = createContext();
const PublicFollowersContext = createContext();
const NotificationContext = createContext();
const ComponentsContext = createContext();
const AuthContext = createContext();
const AuthUserContext = createContext();

export {
  AuthContext,
  AuthUserContext,
  PublicContext,
  FollowersContext,
  PublicFollowersContext,
  NotificationContext,
  ComponentsContext,
};
