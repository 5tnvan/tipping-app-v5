import React from "react";
import Image from "next/image";

type Props = {
  profile: any;
  width: any;
  ring: boolean;
};

export const Avatar = ({ profile, width, ring }: Props) => {
  let textSize;
  if (width > 8) {
    textSize = "text-4xl";
  } else {
    textSize = "text-xl";
  }

  return (
    <>
      <div className={`flex items-center justify-center rounded-full ${ring ? `w-${width + 2} h-${width + 2} moving-gradient` : ""}`}>
        {profile.avatar_url && (
          <div className={`rounded-full w-${width} h-${width} border-2 border-slate-200`}>
            <Image alt="img" src={profile.avatar_url} className="avatar-img rounded-full" width={100} height={100} />
          </div>
        )}
        {!profile.avatar_url && (
          <div
            className={`flex justify-center items-center w-${width} h-${width} bg-slate-100 rounded-full border-2 border-slate-200`}
          >
            <div className={`${textSize} text-primary`}>{profile.username.charAt(0).toUpperCase()}</div>
          </div>
        )}
      </div>
    </>
  );
};
