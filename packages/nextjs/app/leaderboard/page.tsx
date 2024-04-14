"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { NextPage } from "next";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { fetchProfiles } from "~~/utils/app/fetch/fetchUser";

const LeaderboardPage: NextPage = () => {
  const [allProfiles, setAllProfiles] = useState<any>();
  //fetch profile on search
  useEffect(() => {
    const fetch = async () => {
      const res = await fetchProfiles();
      setAllProfiles(res);
    };
    fetch();
  }, []);

  console.log(allProfiles);

  return (
    <div className="wildui-leaderboard-scroll pt-10 pl-6 pr-6 overflow-scroll">
      {allProfiles && (
        <>
          {allProfiles.map((searchProfile: any) => (
            <Link
              key={searchProfile.username} // Add a unique key for each result
              href={`/${searchProfile.username}`}
              className="result flex btn btn-accent bg-gradient-to-r from-cyan-600 via-lime-500 items-center justify-between pt-2 pb-2 mt-2"
            >
              <div className="flex items-center">
                <Avatar profile={searchProfile} width={8} ring={false} />
                <div className="ml-2">@{searchProfile.username}</div>
              </div>
              <div>
                <ChevronRightIcon />
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};
export default LeaderboardPage;
