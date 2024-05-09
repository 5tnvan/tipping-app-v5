"use client";

import { createContext } from "react";

const AuthContext = createContext();
const AuthUserContext = createContext();
const AuthUserFollowsContext = createContext();
const AuthUserNotificationContext = createContext();
const UserContext = createContext();
const UserFollowsContext = createContext();
const ModalsContext = createContext();

export {
  AuthContext,
  AuthUserContext,
  AuthUserFollowsContext,
  AuthUserNotificationContext,
  UserContext,
  UserFollowsContext,
  ModalsContext,
};
