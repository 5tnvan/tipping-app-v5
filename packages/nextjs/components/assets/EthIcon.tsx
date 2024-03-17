import React from "react";

type Props = {
  width: any;
  height: any;
};

export const EthIcon = ({ width, height }: Props) => {
  return (
    <div className="pt-1">
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="m12 1.75l-6.25 10.5L12 16l6.25-3.75zM5.75 13.5L12 22.25l6.25-8.75L12 17.25z"
        ></path>
      </svg>
    </div>
  );
};
