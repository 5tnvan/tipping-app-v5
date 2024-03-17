import React from "react";

type Props = {
  address: string;
};

export const ShortenedAddress = ({ address }: Props) => {
  const shortenedAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  return <span>{shortenedAddress}</span>;
};
