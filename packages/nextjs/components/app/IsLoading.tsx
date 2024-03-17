import React from "react";

type Props = {
  shape: string;
  width: any;
  height: any;
};

export const IsLoading = ({ shape, width, height }: Props) => {
  return (
    <>
      <div className="animate-pulse">
        <div className={`${shape} bg-slate-300 w-${width} h-${height}`}></div>
      </div>
    </>
  );
};
