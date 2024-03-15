"use client";

import { createContext } from "react";

const AppContext = createContext();
const PublicContext = createContext();
const AccountingContext = createContext();
const PublicAccountingContext = createContext();
const FollowersContext = createContext();
const ProfilePayContext = createContext();
const WithdrawContext = createContext();

export {
  AppContext,
  PublicContext,
  AccountingContext,
  PublicAccountingContext,
  FollowersContext,
  ProfilePayContext,
  WithdrawContext,
};
