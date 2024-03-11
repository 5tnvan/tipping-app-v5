import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "../authentication/Avatar";
import { ArrowRightIcon } from "~~/components/assets/ArrowRightIcon";
import { useDebounce } from "~~/hooks/app/useDebounce";
import { fetchPublicProfile } from "~~/utils/app/fetch/fetchUser";
import { IsLoading } from "../IsLoading";

export const SearchModal = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //fetch profile on search
  useEffect(() => {
    const fetchProfile = async () => {
      console.log("debouncedSearchValue: ", debouncedSearchValue);
      setIsLoading(true);

      const result = await fetchPublicProfile(debouncedSearchValue);
      setProfile(result);

      setIsLoading(false);
    };
    if (debouncedSearchValue.trim() !== "") {
      fetchProfile();
    } else {
      //clear results
      setProfile(null);
    }
  }, [debouncedSearchValue]);

  const handleClose = () => {
    console.log("closin");
    setSearchValue("");
    setProfile(null); // Clear the search results
    onClose();
  };
  const handleLink = () => {
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
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
          ✕
        </button>
        {/* SEARCH CONTENT */}
        <div className="pt-12 pl-5 pr-5 pb-10">
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
          <div id="wildpay-search-results" className="mt-5">
            {isLoading && (
              <div className="result flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 animate-pulse bg-slate-300 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"></div>
                  <IsLoading shape="rounded-md" width={28} height={6} />
                </div>
                <div>
                  <ArrowRightIcon />
                </div>
              </div>
            )}
            {!isLoading && profile && (
              <>
                <div className="result flex items-center justify-between" onClick={handleLink}>
                  <div className="flex items-center">
                    <Avatar profile={profile} width={12} />
                    <div className="ml-2">@{profile.username}</div>
                  </div>
                  <div>
                    <ArrowRightIcon />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
