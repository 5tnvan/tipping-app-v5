import React, { useContext, useState } from "react";
import Image from "next/image";
import { AppContext } from "~~/app/context";
import { updateProfileAvatar } from "~~/app/profile/actions";

type Props = {
  isOpen: any;
  onClose: any;
};

export const AvatarModal = ({ isOpen, onClose }: Props) => {
  const { refetchAuth } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState(1);
  const gif: Record<number, string> = {
    // Define gif type explicitly
    1: "https://media1.tenor.com/m/_wA-bSNP3KAAAAAC/pixel-art-pixels.gif",
    2: "https://media1.tenor.com/m/pSq-OwdqmHgAAAAC/heartbeat-static.gif",
    3: "https://media1.tenor.com/m/qA1mRnYpyfwAAAAC/pixel-heart.gif",
  };

  // Select image
  const handleImageClick = (index: any) => {
    setSelectedImage(index);
  };

  // Update avatar change to supabase
  const handleAvatarSave = async () => {
    if (selectedImage !== null) {
      const selectedImageUrl = gif[selectedImage];
      updateProfileAvatar(selectedImageUrl);
      onClose();
      refetchAuth();
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="wildui-modal-container w-full h-full top-0 left-0 fixed flex justify-center items-start z-100">
      <div className="wildui-modal-child flex flex-col text-black z-30 mt-4">
        {/* WITHDRAW FRAME */}
        <div className="modal-content grow rounded-lg">
          {/* AVATAR CLOSE */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
            ✕
          </button>
          {/* AVATAR INTO */}
          {/* choose avatar */}
          <div className="m-5">
            <div className="mb-5 mt-5">Choose your avatar:</div>
            {Object.entries(gif).map(([index, src]) => (
              <div key={index} className="left avatar edit mr-5" onClick={() => handleImageClick(Number(index))}>
                <div
                  className={`w-16 rounded-full edit mr-5 ring-primary ring-offset-base-100 ring-offset-2 ${
                    selectedImage === Number(index) ? "ring" : ""
                  }`}
                >
                  <Image alt={`Image ${index}`} src={src} width={500} height={500} />
                </div>
              </div>
            ))}
            {/* save */}
            <div className="flex justify-center">
              <button className="btn btn-neutral w-full mt-3" onClick={() => handleAvatarSave()}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
