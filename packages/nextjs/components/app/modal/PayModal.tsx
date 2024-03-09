import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Avatar } from "../authentication/Avatar";
import { FollowersContext, PublicContext } from "~~/app/context";
import { fetchPublicProfile, fetchPublicProfileFromId } from "~~/utils/app/fetchUser";

export const PayModal = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [profile, setProfile] = useState(null);
  const { isLoadingPublic, publicProfile, refetchPublic } = useContext(PublicContext);
  const { isLoadingFollowers, followersData, refetchFollowers } = useContext(FollowersContext);
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

  const getFollowings = id => {
    const data = fetchPublicProfileFromId(id);
    console.log(data);
  };

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
        <div>Following:</div>
        <div className="flex flex-col">
          {followersData.following.map((following, index) => (
            <>
              <div className="flex">
                <Avatar profile={following} width={10} />
                <div className="ml-2">@{following.username}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
