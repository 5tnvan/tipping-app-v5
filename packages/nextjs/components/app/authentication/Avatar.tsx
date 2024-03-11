import React from "react";

export const Avatar = ({ profile, width }) => {
  
  let textSize;
  if (width > 8) {
    textSize = "text-4xl";
  } else {
    textSize = "text-xl";
  }

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
            className={`w-${width} bg-slate-100 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2`}
          >
            {/* Placeholder or default avatar */}
            <div className={`${textSize} custom-text-blue`}>{profile.username.charAt(0).toUpperCase()}</div>
          </div>
        )}
      </div>
    </>
  );
};
