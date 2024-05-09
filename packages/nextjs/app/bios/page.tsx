"use client";

import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthUserContext } from "../context";
import { incrementBioView } from "../profile/actions";
import { NextPage } from "next";
import { EyeIcon } from "@heroicons/react/24/solid";
import { TimeAgo } from "~~/components/app/TimeAgo";
import { Avatar } from "~~/components/app/authentication/Avatar";
import { ArrowLeftIcon } from "~~/components/assets/ArrowLeftIcon";
import { fetchAllBios } from "~~/utils/app/fetch/fetchUser";

const BiosPage: NextPage = () => {
  const { refetchAuthUser } = useContext(AuthUserContext);
  const [bios, setBios] = useState<any>();
  const router = useRouter();
  const carouselRef = useRef<HTMLDivElement>(null); // Ref for the carousel container

  //fetch profile on search
  useEffect(() => {
    const fetch = async () => {
      const res = await fetchAllBios();
      // Shuffle the response array
      const shuffledRes = res?.slice().sort(() => Math.random() - 0.5);
      setBios(shuffledRes);
    };
    fetch();
  }, []);

  // Function to handle intersection of carousel items
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Intersection ratio threshold
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bioId = entry.target.getAttribute("data-bio-id");
          if (bioId) {
            incrementBioView(bioId); // increment view
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (carouselRef.current) {
      carouselRef.current.querySelectorAll(".carousel-item").forEach(item => {
        observer.observe(item); // Observe each carousel item
      });
      console.log("carouselRef", carouselRef);
      console.log("carouselRef.current", carouselRef.current);
    }

    return () => {
      observer.disconnect(); // Disconnect the observer when the component unmounts
    };
  }, [bios]);

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="wildui-modal-container w-full h-full top-0 left-0 fixed flex justify-center items-start z-100">
          <div className="wildui-modal-child flex flex-col z-30 mt-4">
            {/* BIOS FRAME */}
            <div className="modal-content grow rounded-3xl bg-black text-white">
              {/* BIOS BACK */}
              <div
                className="absolute left-6 top-6 z-50 cursor-pointer"
                onClick={() => {
                  refetchAuthUser();
                  router.back();
                }}
              >
                <ArrowLeftIcon />
              </div>
              <div className="carousel carousel-vertical rounded-box bg-black" ref={carouselRef}>
                {bios?.map((bio: any) => (
                  <div
                    key={bio.id}
                    className="carousel-item w-full h-full"
                    data-bio-id={bio.profile_bios[bio.profile_bios.length - 1]?.id}
                  >
                    {bio.profile_bios.length == 0 && (
                      <div className="flex flex-col w-full pt-12 pb-8 px-6">
                        <div className="flex items-center">
                          <Link href={`/${bio.username}`} className="flex gap-2 items-center">
                            <Avatar profile={bio} width={8} height={8} border={2} ring={9} gradient={"g-white"} />
                            <div>{bio.username}</div>
                          </Link>
                        </div>
                        <div className="grow flex items-center justify-center font-normal">
                          <div className="text-accent mr-1">{bio.username}</div> is napping.
                        </div>
                        <Link href={`/${bio.username}`} className="btn btn-accent">
                          Visit profile
                        </Link>
                      </div>
                    )}
                    {bio.profile_bios.length > 0 && (
                      <>
                        <div className="flex flex-col w-full pt-12 pb-8 px-6">
                          <div className="flex justify-between">
                            <div className="flex gap-2 items-center">
                              <div className="flex items-center">
                                <Link href={`/${bio.username}`} className="flex gap-2 items-center">
                                  <Avatar
                                    profile={bio}
                                    width={8}
                                    height={8}
                                    border={2}
                                    ring={9}
                                    gradient={"g-tropical"}
                                  />
                                  <div>{bio.username}</div>
                                </Link>
                              </div>
                              <span className="text-slate-500">
                                <TimeAgo timestamp={bio.profile_bios[bio.profile_bios.length - 1].created_at} />
                              </span>
                            </div>
                            <div className="flex gap-1 items-center">
                              <EyeIcon width={14} />
                              <div>{bio.profile_bios[bio.profile_bios.length - 1].views}</div>
                            </div>
                          </div>
                          <div className="grow text-3xl flex items-center font-semibold">
                            {bio.profile_bios[bio.profile_bios.length - 1].content}
                          </div>
                          <div className="flex flex-col justify-end font-normal">
                            <Link href={`/${bio.username}`} className="btn btn-accent">
                              Visit profile
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BiosPage;
