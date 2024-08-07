import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IsLoading } from "../IsLoading";
import { Avatar } from "../authentication/Avatar";
import { ChevronRightIcon, MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { useDebounce } from "~~/hooks/app/useDebounce";
import { fetchPublicProfileMatchingWith } from "~~/utils/app/fetch/fetchUser";

type Props = {
  isOpen: any;
  onClose: any;
};

export const SearchModal = ({ isOpen, onClose }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchRes, setSearchRes] = useState<any>(null);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue);

  //fetch profile on search
  useEffect(() => {
    const fetchProfile = async () => {
      console.log("debouncedSearchValue: ", debouncedSearchValue);
      setIsSearchLoading(true);

      const result = await fetchPublicProfileMatchingWith(debouncedSearchValue.toLowerCase());
      setSearchRes(result);

      setIsSearchLoading(false);
    };
    if (debouncedSearchValue.trim() !== "") {
      fetchProfile();
    } else {
      //clear results
      setSearchRes(null);
    }
  }, [debouncedSearchValue]);

  const handleClose = () => {
    setSearchValue(""); // Clear search results
    setSearchRes(null); // Clear the search results
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
            <MagnifyingGlassCircleIcon width={30} />
          </label>
          {/* SEARCH RESULTS */}
          <div id="wildpay-search-results" className="wildui-search-res-scroll mt-5 pb-10">
            {isSearchLoading && (
              <div className="flex btn items-center justify-between pt-2 pb-2 mt-2">
                <div className="flex items-center">
                  <div className="w-8 h-6 animate-pulse bg-slate-200 rounded-full mr-3"></div>
                  <IsLoading shape="rounded-md" width={20} height={6} />
                </div>
                <div>
                  <ChevronRightIcon />
                </div>
              </div>
            )}
            {!isSearchLoading && searchRes && searchRes.length > 0 && (
              <>
                {searchRes.map((searchProfile: any) => (
                  <Link
                    key={searchProfile.username} // Add a unique key for each result
                    href={`/${searchProfile.username}`}
                    className="result flex btn btn-accent h-max bg-gradient-to-r from-cyan-600 via-lime-500 items-center justify-between pt-2 pb-2 mt-2"
                    onClick={handleLink}
                  >
                    <div className="flex items-center">
                      {searchProfile.profile_bios.length > 0 && (
                        <Avatar
                          profile={searchProfile}
                          width={8}
                          height={8}
                          border={2}
                          ring={9}
                          gradient={"g-tropical"}
                        />
                      )}
                      {searchProfile.profile_bios.length == 0 && (
                        <Avatar profile={searchProfile} width={8} height={8} border={0} ring={9} gradient={"g-white"} />
                      )}

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
        </div>
      </div>
    </div>
  );
};
