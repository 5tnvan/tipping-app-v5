"use client";

import { NextPage } from "next";
import AvatarCreator from "~~/components/app/avatar/page";

const PrivatePage: NextPage = () => {
  return (
    <div className="bg-white text-black">
      <AvatarCreator />
    </div>
  );
};
export default PrivatePage;
