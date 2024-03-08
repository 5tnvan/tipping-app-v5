import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Avatar } from "../authentication/Avatar";
import { PublicContext } from "~~/app/context";
import { ArrowRightIcon } from "~~/components/assets/ArrowRightIcon";
import { fetchPublicProfile } from "~~/utils/app/fetchUser";

export const SearchModal = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [profile, setProfile] = useState(null);
  const { isLoadingPublic, publicProfile, refetchPublic } = useContext(PublicContext);
  const { username } = useParams();

  //fetch profile on search
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await fetchPublicProfile(searchValue);
        setProfile(result);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      }
    };

    if (searchValue.trim() !== "") {
      fetchProfile();
    }
  }, [searchValue]);

  const handleClose = () => {
    console.log("closin");
    setSearchValue("");
    setProfile(null); // Clear the search results
    onClose();
  };
  const handleLink = () => {
    console.log("handlelink(): " + `/${profile.username}`);
    console.log(username);
    handleClose();
    router.refresh();
    router.push(`/${profile.username}`);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex flex-col text-black z-30 absolute w-full h-full left-0">
      {/* SEARCH FRAME */}
      <div className="modal-content grow">
        {/* SEARCH CLOSE */}
        <span className="close-button" onClick={handleClose}>
          &times;
        </span>
        {/* SEARCH CONTENT */}
        <div>
          {/* SEARCH INPUT */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          {/* SEARCH RESULTS */}
          <div id="wildpay-search-results" className="">
            {profile && (
              <>
                <div className="result flex items-center justify-between" onClick={handleLink}>
                  <div className="flex items-center">
                    <Avatar profile={profile} width={14} />
                    <div className="ml-2">@{profile.username}</div>
                  </div>
                  <div>
                    <ArrowRightIcon />
                  </div>
                </div>

                {/* <div
                  className="result flex items-center justify-between"
                  onClick={() => router.push(`/${profile.username}`)}
                >
                  <div className="flex items-center">
                    <Avatar profile={profile} width={14} />
                    <div className="ml-2">@{profile.username}</div>
                  </div>
                  <div>
                    <ArrowRightIcon />
                  </div>
                </div> */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
