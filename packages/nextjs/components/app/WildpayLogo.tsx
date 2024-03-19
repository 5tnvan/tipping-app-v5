import React from "react";
import Image from "next/image";

type Props = {
  color: any;
  width: any;
  height: any;
};

export const WildPayLogo = ({ color, width, height }: Props) => {
  if (color == "white") {
    return <Image alt="wildpay" src="/wildpay-logo-white.svg" width={width} height={height} />;
  }
  if (color == "blue") {
    return <Image alt="wildpay" src="/wildpay-logo.svg" width={width} height={height} />;
  }
};
