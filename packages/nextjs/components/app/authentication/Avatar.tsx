import React from "react";
import Image from "next/image";

type Props = {
  profile: any;
  width: any;
  height: any;
  border: any;
  ring: any;
  gradient: any;
};

export const Avatar = ({ profile, width, height, border, ring, gradient }: Props) => {
  let textSize;
  if (width > 8) {
    textSize = "text-4xl";
  } else {
    textSize = "text-xl";
  }

  return (
    <>
      <div className={`flex items-center justify-center rounded-full w-${ring} h-${ring} ${gradient}`}>
        {profile.avatar_url && (
          <div className={`rounded-full w-${width} h-${height} border-${border} border-slate-200`}>
            <Image alt="img" src={profile.avatar_url} className="avatar-img rounded-full" width={100} height={100} />
          </div>
        )}
        {!profile.avatar_url && (
          <div
            className={`flex justify-center items-center w-${width} h-${width} bg-slate-100 rounded-full border-${border} border-slate-200`}
          >
            <div className={`${textSize} text-primary`}>{profile.username.charAt(0).toUpperCase()}</div>
          </div>
        )}
      </div>
    </>
  );
};
