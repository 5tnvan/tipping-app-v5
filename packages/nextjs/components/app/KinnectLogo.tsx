import React from "react";
import Image from "next/image";

type Props = {
  color: any;
  width: any;
  height: any;
};

export const KinnectLogo = ({ color, width, height }: Props) => {
  if (color == "white") {
    return <Image alt="wildpay" src="/kinnect_white.svg" width={width} height={height} />;
  }
  if (color == "blue") {
    return <Image alt="wildpay" src="/kinnect.svg" width={width} height={height} />;
  }
};
