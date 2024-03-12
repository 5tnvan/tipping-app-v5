import React from "react";

export const IsLoading = ({ shape, width, height }) => {
  return (
    <>
      <div className="animate-pulse">
        <div className={`${shape} bg-slate-300 w-${width} h-${height}`}></div>
      </div>
    </>
  );
};
