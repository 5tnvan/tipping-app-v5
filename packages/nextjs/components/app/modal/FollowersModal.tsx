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
    <div className="wildui-modal-container w-full h-full top-0 left-0 fixed flex justify-center items-start z-100">
      <div className="wildui-modal-child flex flex-col text-black z-30 mt-4">
        {/* FOLLOWERS FRAME */}
        <div className="modal-content grow rounded-lg">
          {/* FOLLOWERS CLOSE */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
            ✕
          </button>
          {/* FOLLOWERS INTO */}
          <div className="flex flex-col justify-center items-center mt-10">
            <Avatar profile={publicProfile} width={16} ring={16} height={16} border={0} gradient={undefined} />
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
    </div>
  );
};
