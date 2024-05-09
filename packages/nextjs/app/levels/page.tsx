"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AuthUserContext, AuthContext } from "../context";
import { NextPage } from "next";
import { TimeAgo } from "~~/components/app/TimeAgo";
import { UnlockModal } from "~~/components/app/modal/UnlockModal";

const LevelsPage: NextPage = () => {
  const router = useRouter();
  /* PARENTS CONTEXT */
  const { user } = useContext(AuthContext);
  const { profile } = useContext(AuthUserContext);
  const [levelToUnlock, setLevelToUnlock] = useState<any>();
  const [level1, setLevel1] = useState<any>();
  const [level2, setLevel2] = useState<any>();
  const [level3, setLevel3] = useState<any>();
  const [level4, setLevel4] = useState<any>();
  const [level5, setLevel5] = useState<any>();

  //fetch profile on search
  useEffect(() => {
    const fetch = async () => {
      setLevel1(profile.levels.find((item: any) => item.level === 1));
      setLevel2(profile.levels.find((item: any) => item.level === 2));
      setLevel3(profile.levels.find((item: any) => item.level === 3));
      setLevel4(profile.levels.find((item: any) => item.level === 4));
      setLevel5(profile.levels.find((item: any) => item.level === 5));
    };
    fetch();
  }, [profile.levels]);

  /**
   * ACTION: Open close create modal
   **/
  const [isUnlockModalOpen, setUnlockModalOpen] = useState(false);

  const openUnlockModal = (num: any) => {
    setUnlockModalOpen(true);
    setLevelToUnlock(num);
  };

  const closeUnlockModal = () => {
    setUnlockModalOpen(false);
  };

  return (
    <>
      {isUnlockModalOpen && (
        <UnlockModal isOpen={isUnlockModalOpen} onClose={closeUnlockModal} levelToUnlock={levelToUnlock}></UnlockModal>
      )}
      <div className="flex justify-between items-center font-semibold mt-6 mb-3 pt-10 pl-6 pr-6">
        <button className="btn btn-sm btn-primary" onClick={() => router.back()}>
          Back
        </button>
        <div className="flex items-center">
          <span className="text-base mt-1 mr-2">(6)</span>
          <span className="text-primary text-4xl">Levels</span>
        </div>
      </div>
      <div className="wildui-generic-scroll-c overflow-scroll pl-5 pr-5">
        {/* Level 0 - Noob */}
        <div className="card achieved w-full bg-neutral-500 shadow-xl image-full mb-5">
          <figure>
            <Image src="/levels/level0.png" alt="" width="500" height="500" />
          </figure>
          <div className="card-body">
            <h2 className="card-title flex justify-between">
              <div>Noob</div>
              <div className="flex gap-1">
                <TimeAgo timestamp={user.created_at} />
                <div>ago</div>
              </div>
            </h2>

            <p>Everyone was a newbie once.</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Achieved 🎉</button>
            </div>
          </div>
        </div>
        {/* Level 1 - Creator */}
        {!level1 && ( //unlock
          <div className="card w-full levelup bg-neutral-500 shadow-xl image-full mb-5">
            <figure>
              <Image src="/levels/level1.png" alt="" width="500" height="500" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Creator</h2>
              <p>Mixing, matching. Let yourself cook.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-secondary" onClick={() => openUnlockModal(1)}>
                  Unlock
                </button>
              </div>
            </div>
          </div>
        )}
        {level1 && ( //achieved
          <div className="card w-full achieved bg-neutral-500 shadow-xl image-full mb-5">
            <figure>
              <Image src="/levels/level1.png" alt="" width="500" height="500" />
            </figure>
            <div className="card-body">
              <h2 className="card-title flex justify-between">
                <div>Creator</div>
                <div className="flex gap-1">
                  <TimeAgo timestamp={level1.created_at} />
                  <div>ago</div>
                </div>
              </h2>
              <p>Mixing, matching. Let yourself cook.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Achieved 🎉</button>
              </div>
            </div>
          </div>
        )}

        {/* Level 2 - Builder */}
        {!level1 && ( //empty
          <div className="card w-full bg-base-100 shadow-xl image-full mb-5">
            <figure></figure>
            <div className="card-body">
              <h2 className="card-title">Locked</h2>
              <p></p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-disabled">Locked</button>
              </div>
            </div>
          </div>
        )}
        {level1 &&
          !level2 && ( //unlock
            <div className="card w-full levelup bg-base-100 shadow-xl image-full mb-5">
              <figure>
                <Image src="/levels/level2.png" alt="" width="500" height="500" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Builder</h2>
                <p>{`Let's put in the work!`}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-secondary" onClick={() => openUnlockModal(2)}>
                    Unlock
                  </button>
                </div>
              </div>
            </div>
          )}
        {level1 &&
          level2 && ( //achieved
            <div className="card w-full achieved bg-base-100 shadow-xl image-full mb-5">
              <figure>
                <Image src="/levels/level2.png" alt="" width="500" height="500" />
              </figure>
              <div className="card-body">
                <h2 className="card-title flex justify-between">
                  <div>Builder</div>
                  <div className="flex gap-1">
                    <TimeAgo timestamp={level2.created_at} />
                    <div>ago</div>
                  </div>
                </h2>
                <p>{`Let's put in the work!`}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Achieved 🎉</button>
                </div>
              </div>
            </div>
          )}

        {/* Level 3 - Architect */}
        {!level2 && (
          <div className="card w-full bg-base-100 shadow-xl image-full mb-5">
            <figure></figure>
            <div className="card-body">
              <h2 className="card-title">Locked</h2>
              <p></p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-disabled">Locked</button>
              </div>
            </div>
          </div>
        )}
        {level2 && !level3 && (
          <div className="card w-full levelup bg-base-100 shadow-xl image-full mb-5">
            <figure>
              <Image src="/levels/level3.png" alt="" width="500" height="500" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Architect</h2>
              <p>A master-mind always has a plan.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-secondary" onClick={() => openUnlockModal(3)}>
                  Unlock
                </button>
              </div>
            </div>
          </div>
        )}
        {level2 && level3 && (
          <div className="card w-full achieved bg-base-100 shadow-xl image-full mb-5">
            <figure>
              <Image src="/levels/level3.png" alt="" width="500" height="500" />
            </figure>
            <div className="card-body">
              <h2 className="card-title flex justify-between">
                <div>Architect</div>
                <div className="flex gap-1">
                  <TimeAgo timestamp={level2.created_at} />
                  <div>ago</div>
                </div>
              </h2>
              <p>A master-mind always has a plan.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Achieved 🎉</button>
              </div>
            </div>
          </div>
        )}

        {/* Level 4 - Visionary */}
        {!level3 && (
          <div className="card w-full bg-base-100 shadow-xl image-full mb-5">
            <figure></figure>
            <div className="card-body">
              <h2 className="card-title">Locked</h2>
              <p></p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-disabled">Locked</button>
              </div>
            </div>
          </div>
        )}
        {level3 && !level4 && (
          <div className="card w-full levelup bg-base-100 shadow-xl image-full mb-5">
            <figure>
              <Image src="/levels/level4.png" alt="" width="500" height="500" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Visionary</h2>
              <p>It all starts with an idea.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-secondary" onClick={() => openUnlockModal(4)}>
                  Unlock
                </button>
              </div>
            </div>
          </div>
        )}
        {level3 && level4 && (
          <div className="card w-full achieved bg-base-100 shadow-xl image-full mb-5">
            <figure>
              <Image src="/levels/level4.png" alt="" width="500" height="500" />
            </figure>
            <div className="card-body">
              <h2 className="card-title flex justify-between">
                <div>Visionary</div>
                <div className="flex gap-1">
                  <TimeAgo timestamp={level2.created_at} />
                  <div>ago</div>
                </div>
              </h2>
              <p>It all starts with an idea.</p>
              <div className="card-actions justify-end">
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Achieved 🎉</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Level 5 - God-mode */}
        {!level4 && (
          <div className="card w-full bg-base-100 shadow-xl image-full mb-5">
            <figure></figure>
            <div className="card-body">
              <h2 className="card-title">Locked</h2>
              <p></p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-disabled">Locked</button>
              </div>
            </div>
          </div>
        )}
        {level4 && !level5 && (
          <div className="card w-full levelup bg-base-100 shadow-xl image-full mb-5">
            <figure>
              <Image src="/levels/level5.png" alt="" width="500" height="500" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">God-mode</h2>
              <p>He who walked the path comes back and teach.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-secondary" onClick={() => openUnlockModal(5)}>
                  Unlock
                </button>
              </div>
            </div>
          </div>
        )}
        {level4 && level5 && (
          <div className="card w-full achieved bg-base-100 shadow-xl image-full mb-5">
            <figure>
              <Image src="/levels/level5.png" alt="" width="500" height="500" />
            </figure>
            <div className="card-body">
              <h2 className="card-title flex justify-between">
                <div>God-mode</div>
                <div className="flex gap-1">
                  <TimeAgo timestamp={level2.created_at} />
                  <div>ago</div>
                </div>
              </h2>
              <p>He who walked the path comes back and teach.</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Achieved 🎉</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default LevelsPage;
