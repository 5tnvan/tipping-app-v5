import React, { useContext } from "react";
import { Avatar } from "../authentication/Avatar";
import { deleteFollowing } from "~~/app/(profile)/[username]/actions";
import { FollowersContext, PublicContext } from "~~/app/context";

type Props = {
  isOpen: any;
  onClose: any;
  data: any;
  refetch: any;
};

export const FollowersModal = ({
  isOpen,
  onClose,
  data: followersPublicData,
  refetch: refetchPublicFollowers,
}: Props) => {
  const { publicProfile } = useContext(PublicContext);
  const { refetchFollowers } = useContext(FollowersContext);

  const handleClose = () => {
    onClose();
  };

  const handleUnfollow = async () => {
    console.log(publicProfile.id);
    try {
      await deleteFollowing(publicProfile.id);
      handleClose();
      refetchPublicFollowers();
      refetchFollowers();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex flex-col text-black z-30 absolute w-full p-5 rounded-lg left-0 top-4">
      {/* FOLLOWERS FRAME */}
      <div className="modal-content grow box-shadow-01">
        {/* FOLLOWERS CLOSE */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
          ✕
        </button>
        {/* FOLLOWERS INTO */}
        <div className="flex flex-col justify-center items-center mt-10">
          <Avatar profile={publicProfile} width={16} />
          <div className="font-semibold mt-2">@{publicProfile.username}</div>
        </div>
        {/* FOLLOWERS STATS */}
        <div className="flex justify-around m-5">
          <div className="flex flex-col items-center">
            <div className="font-semibold">{followersPublicData?.followersCount}</div>
            <div>Followers</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="font-semibold">{followersPublicData?.followingCount}</div>
            <div>Following</div>
          </div>
        </div>
        {/* FOLLOWERS CTA */}
        <div className="m-5">
          {followersPublicData?.followed && (
            <div className="btn btn-light w-full" onClick={handleUnfollow}>
              Unfollow
            </div>
          )}
          {!followersPublicData?.followed && <div className="btn btn-light w-full">Follow</div>}
        </div>
      </div>
    </div>
  );
};
