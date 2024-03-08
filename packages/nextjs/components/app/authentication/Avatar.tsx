import React from "react";

export const Avatar = ({ profile, width }) => {
  return (
    <>
      <div className="avatar">
        {profile.avatar_url ? (
          <div className={`w-${width} rounded-full ring ring-primary ring-offset-base-100 ring-offset-2`}>
            <img alt="avatar" src={profile.avatar_url} width="64" height="64" />
          </div>
        ) : (
          <div
            id="wildpay-avatar"
            className={`w-${width} rounded-full ring ring-primary ring-offset-base-100 ring-offset-2`}>
            {/* Placeholder or default avatar */}
            <div className="text-4xl custom-text-blue">{profile.username.charAt(0).toUpperCase()}</div>
          </div>
        )}
      </div>
    </>
  );
};
