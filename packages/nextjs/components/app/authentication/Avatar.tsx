import React from "react";

export const Avatar = ({ profile, width, height }) => {

  return (
    <>
      {profile.avatar_url ? (
        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img alt="avatar" src={profile.avatar_url} width={width} height={height} />
        </div>
      ) : (
        <div
          id="wildpay-avatar"
          className="w-16 bg-slate-200 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
        >
          {/* Placeholder or default avatar */}
          <div className="text-4xl custom-text-blue">{profile.username.charAt(0).toUpperCase()}</div>
          {/* <img src="/wildpay-logo.svg" width={20} height={20} className="mr-2 absolute top-0"></img> */}
        </div>
      )}
    </>
  );
};
