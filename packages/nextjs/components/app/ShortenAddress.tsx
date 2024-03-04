import React from "react";

export const ShortenedAddress = ({ address }) => {
  const shortenedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  return <span>{shortenedAddress}</span>;
};
