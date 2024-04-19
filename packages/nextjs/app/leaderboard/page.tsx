"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { fetchProfiles } from "~~/utils/app/fetch/fetchUser";

const LeaderboardPage: NextPage = () => {
  const [allProfiles, setAllProfiles] = useState<any>();
  const router = useRouter();
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
    <>
      <div className="flex justify-between items-center font-semibold mt-6 mb-3 pt-10 pl-6 pr-6">
        <button className="btn btn-sm btn-primary" onClick={() => router.back()}>
          Back
        </button>
        <div className="flex items-center">
          <span className="text-base mt-1 mr-2">({allProfiles?.length})</span>
          <span className="text-primary text-4xl">All</span>
        </div>
      </div>
      <div className="wildui-leaderboard-scroll pl-6 pr-6 pb-10 overflow-scroll z-0">
        {allProfiles && (
          <>
            {allProfiles.map((profile: any) => (
              <Link
                key={profile.username} // Add a unique key for each result
                href={`/${profile.username}`}
                className="result flex btn btn-neutral h-max items-center justify-between pt-2 pb-2 mt-2"
              >
                <div className="flex items-center">
                  {profile.profile_bios?.length > 0 ? (
                    <Avatar profile={profile} width={8} height={8} border={2} ring={9} gradient={"g-tropical"} />
                  ) : (
                    profile.profile_bios?.length == 0 && (
                      <Avatar profile={profile} width={8} height={8} border={0} ring={9} gradient={"g-white"} />
                    )
                  )}
                  <div className="ml-2">@{profile.username}</div>
                </div>
                <div>
                  <ChevronRightIcon />
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </>
  );
};
export default LeaderboardPage;
