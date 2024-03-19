import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IsLoading } from "../IsLoading";
import { Avatar } from "../authentication/Avatar";
import { ArrowRightIcon } from "~~/components/assets/ArrowRightIcon";
import { useDebounce } from "~~/hooks/app/useDebounce";
import { fetchPublicProfile } from "~~/utils/app/fetch/fetchUser";

type Props = {
  isOpen: any;
  onClose: any;
};

export const SearchModal = ({ isOpen, onClose }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchProfile, setSearchProfile] = useState({
    username: null,
    avatar_url: null,
  });
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue);

  //fetch profile on search
  useEffect(() => {
    const fetchProfile = async () => {
      console.log("debouncedSearchValue: ", debouncedSearchValue);
      setIsSearchLoading(true);

      const result = await fetchPublicProfile(debouncedSearchValue);
      setSearchProfile(result);

      setIsSearchLoading(false);
    };
    if (debouncedSearchValue.trim() !== "") {
      fetchProfile();
    } else {
      //clear results
      setSearchProfile({
        username: null,
        avatar_url: null,
      });
    }
  }, [debouncedSearchValue]);

  const handleClose = () => {
    setSearchValue(""); // Clear search results
    setSearchProfile({
      username: null,
      avatar_url: null,
    }); // Clear the search results
    onClose();
  };
  const handleLink = () => {
    handleClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex flex-col text-black z-30 absolute w-full h-full left-0">
      {/* SEARCH FRAME */}
      <div className="modal-content grow">
        {/* SEARCH CLOSE */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
          ✕
        </button>
        {/* SEARCH CONTENT */}
        <div className="pt-12 pl-5 pr-5 pb-10">
          {/* SEARCH INPUT */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow bg-white"
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
          <div id="wildpay-search-results" className="mt-5">
            {isSearchLoading && (
              <div className="flex btn btn-secondary h-full items-center justify-between pt-2 pb-2 mt-2">
                <div className="flex items-center">
                  <div className="w-8 h-6 animate-pulse bg-slate-300 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mr-3"></div>
                  <IsLoading shape="rounded-md" width={24} height={6} />
                </div>
                <div>
                  <ArrowRightIcon />
                </div>
              </div>
            )}
            {!isSearchLoading && searchProfile.username && (
              <>
                <Link
                  href={`/${searchProfile.username}`}
                  className="result flex btn btn-secondary h-full items-center justify-between pt-2 pb-2 mt-2"
                  onClick={handleLink}
                >
                  <div className="flex items-center">
                    <Avatar profile={searchProfile} width={8} ring={false} />
                    <div className="ml-2">@{searchProfile.username}</div>
                  </div>
                  <div>
                    <ArrowRightIcon />
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
