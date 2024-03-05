import React from "react";

export const Avatar = ({ src, width, height }) => {
  return (
    <>
      <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
        <img alt="avatar" src={src} width={width} height={height} />
      </div>
    </>
  );
};
