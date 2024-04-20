"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { UnlockModal } from "~~/components/app/modal/UnlockModal";
import { fetchProfiles } from "~~/utils/app/fetch/fetchUser";

const LevelsPage: NextPage = () => {
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

  /**
   * ACTION: Open close create modal
   **/
  const [isUnlockModalOpen, setUnlockModalOpen] = useState(false);

  const openUnlockModal = () => {
    setUnlockModalOpen(true);
  };

  const closeUnlockModal = () => {
    setUnlockModalOpen(false);
  };

  return (
    <>
      {isUnlockModalOpen && <UnlockModal isOpen={isUnlockModalOpen} onClose={closeUnlockModal}></UnlockModal>}
      <div className="flex justify-between items-center font-semibold mt-6 mb-3 pt-10 pl-6 pr-6">
        <button className="btn btn-sm btn-primary" onClick={() => router.back()}>
          Back
        </button>
        <div className="flex items-center">
          <span className="text-base mt-1 mr-2">(5)</span>
          <span className="text-primary text-4xl">Levels</span>
        </div>
      </div>
      <div className="wildui-generic-scroll-a overflow-scroll pl-5 pr-5">
        <div className="card unlocked w-full bg-neutral-500 shadow-xl image-full mb-5">
          <figure>
            <img
              src="https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/K5B2ZSDJCBB43O4VVTP73PV4RA.png"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Noob</h2>
            <p>Everyone was a newbie once.</p>
            {/* <div className="card-actions justify-end">
              <button className="btn btn-primary">Unlock</button>
            </div> */}
          </div>
        </div>
        <div className="card levelup w-full bg-neutral-500 shadow-xl image-full mb-5">
          <figure>
            <img
              src="https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/K5B2ZSDJCBB43O4VVTP73PV4RA.png"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Creator</h2>
            <p>Mixing, matching. Let yourself cook.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={openUnlockModal}>
                Unlock
              </button>
            </div>
          </div>
        </div>
        <div className="card w-full bg-base-100 shadow-xl image-full mb-5">
          <figure>
            {/* <img src="https://www.parsehub.com/blog/content/images/2022/01/most-expensive-cryptopunks.png" alt="Shoes" /> */}
          </figure>
          <div className="card-body">
            <h2 className="card-title">Locked</h2>
            {/* <p>{`Let's put in the work!`}</p> */}
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-disabled">Unlock</button>
            </div>
          </div>
        </div>
        <div className="card w-full bg-base-100 shadow-xl image-full mb-5">
          <figure>
            {/* <img src="https://nftplazas.com/wp-content/uploads/2023/12/yuga-labs-cryptopunks-wrapper-wp-thumbnail.jpg" alt="Shoes" /> */}
          </figure>
          <div className="card-body">
            <h2 className="card-title">Locked</h2>
            {/* <p>A master-mind always has a plan.</p> */}
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-disabled">Unlock</button>
            </div>
          </div>
        </div>
        <div className="card w-full bg-base-100 shadow-xl image-full mb-5">
          <figure>
            {/* <img src="https://www.christies.com/-/jssmedia/images/features/articles/2021/04/10-thing-to-know-about-cryptopunks/cryptopunks-3-punks-larva-labs-hoodie-smoker-glasses-nfts-at-christies-new-rvs_0409.jpg?h=655&iar=0&w=1049&rev=b7213332a4ff4ef7be49678668b7e93f&hash=63a381a81a9a8e9d71b25ead8c9d27305d408960" alt="Shoes" /> */}
          </figure>
          <div className="card-body">
            <h2 className="card-title">Locked</h2>
            {/* <p>It all starts with an idea.</p> */}
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-disabled">Unlock</button>
            </div>
          </div>
        </div>
        <div className="card w-full bg-base-100 shadow-xl image-full mb-5">
          <figure>
            {/* <img src="https://www.christies.com/-/jssmedia/images/features/articles/2021/04/10-thing-to-know-about-cryptopunks/cryptopunks-3-punks-larva-labs-hoodie-smoker-glasses-nfts-at-christies-new-rvs_0409.jpg?h=655&iar=0&w=1049&rev=b7213332a4ff4ef7be49678668b7e93f&hash=63a381a81a9a8e9d71b25ead8c9d27305d408960" alt="Shoes" /> */}
          </figure>
          <div className="card-body">
            <h2 className="card-title">Locked</h2>
            {/* <p>He who walked the path comes back and teach.</p> */}
            <div className="card-actions justify-end">
              <button className="btn btn-primary btn-disabled">Unlock</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LevelsPage;
