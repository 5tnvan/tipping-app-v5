"use client";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";
import { NextPage } from "next";
import AvatarCreator from "~~/components/app/avatar/page";
import { fetchFollowersWithRange } from "~~/utils/app/fetch/fetchFollowers";

const PrivatePage: NextPage = () => {
  const { profile } = useContext(AppContext);
  const [res, setRes] = useState<any>();
  useEffect(() => {
    async function fetchData() {
      const result = await fetchFollowersWithRange("30e68e4b-7e19-43be-b890-0592e3e1ec38");
      setRes(result);
    }
    fetchData();
  }, [profile]);

  console.log("res", res);
  return <div className="bg-white text-black">{/* <AvatarCreator /> */}</div>;
};
export default PrivatePage;
