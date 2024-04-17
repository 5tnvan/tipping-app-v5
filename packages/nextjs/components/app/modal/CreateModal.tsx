import React, { useContext, useState } from "react";
import { Avatar } from "../authentication/Avatar";
import { BackgroundGradient } from "../ui/background-gradient";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { BanknotesIcon, FireIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { AppContext } from "~~/app/context";
import { postProfileBio } from "~~/app/profile/actions";

type Props = {
  isOpen: any;
  onClose: any;
};

export const CreateModal = ({ isOpen, onClose }: Props) => {
  const { profile, refetchAuth } = useContext(AppContext);

  //SWITCH 3 LINKS
  const [choosen, setChoosen] = useState("init");
  const handleChoosen = (string: string) => {
    setChoosen(string);
    console.log(choosen);
  };

  //HANDLE CLOSE MODAL
  const handleClose = () => {
    setChoosen("init");
    setTab("preview");
    setInput("Start typing...");
    setError(false);
    setIsProcessing(false);
    setCtaOption(0);
    onClose();
  };

  //1. CREATE WILDBIO
  const [tab, setTab] = useState("preview");
  const [isProcessing, setIsProcessing] = useState(false);
  const [input, setInput] = useState("Start typing...");
  const [ctaOption, setCtaOption] = useState(0);
  const [error, setError] = useState(false);

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };
  const handlePost = async () => {
    if (input?.length === 0) {
      setError(true);
    } else {
      setIsProcessing(true);
      const res = await postProfileBio(input, ctaOption);
      if (res) {
        setIsProcessing(false);
        refetchAuth();
        onClose();
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="wildui-modal-container w-full h-full top-0 left-0 fixed flex justify-center items-start z-100">
      <div className="wildui-modal-child flex flex-col text-black z-30 mt-4">
        {/* CREATE FRAME */}
        <div className="modal-content grow rounded-lg">
          {/* CREATE CLOSE */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleClose}>
            ✕
          </button>
          {/* CREATE INFO */}
          {choosen == "init" && (
            <div className="m-5 mt-10">
              <div className="mb-2">Choose create mode:</div>
              <div>
                <div
                  className="btn grid w-full h-20 rounded bg-accent text-accent-content place-content-cente"
                  onClick={() => handleChoosen("wildbio")}
                >
                  <div className="flex items-center">
                    <PlusCircleIcon width={18} />
                    <div className="ml-1">Create a Wild Bio</div>
                  </div>
                </div>
                <div className="btn grid w-full h-20 rounded bg-secondary text-secondary-content place-content-center btn-disabled">
                  <div className="flex items-center">
                    <BanknotesIcon width={18} />
                    <div className="ml-1">Create a Wild-NFT</div>
                  </div>
                </div>
                <div className="btn grid w-full h-20 rounded bg-accent text-accent-content place-content-center btn-disabled">
                  <div className="flex items-center">
                    <FireIcon width={18} />
                    <div className="ml-1">Create a Wildfire</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {choosen == "wildbio" && (
            <div className="m-5 mt-10">
              <div role="tablist" className="tabs tabs-boxed mb-2">
                <div
                  role="tab"
                  className={`tab ${tab === "preview" ? "tab-active" : ""}`}
                  onClick={() => (setTab("preview"), setError(false))}
                >
                  Preview
                </div>
                <div
                  role="tab"
                  className={`tab ${tab === "edit" ? "tab-active" : ""}`}
                  onClick={() => (setTab("edit"), setError(false))}
                >
                  Edit
                </div>
              </div>
              {tab == "preview" && (
                <>
                  <div>
                    <BackgroundGradient className="rounded-[22px] p-5 pt-10 bg-white dark:bg-zinc-900">
                      <div className="flex items-center">
                        <Avatar profile={profile} width={8} ring={false} />
                        <span className="ml-2 font-semibold">@{profile.username}</span>
                      </div>
                      <TextGenerateEffect words={input} />
                      <div className="btn btn-accent w-full mt-5">{ctaOption == 0 ? "Pay now" : "Follow Me"}</div>
                    </BackgroundGradient>
                    {error && <div className="mt-5 text-red-600">Your content is empty. Please try again.</div>}
                    <div className="btn btn-primary w-full mt-5" onClick={handlePost}>
                      Post{isProcessing && <span className="loading loading-ring loading-md"></span>}
                    </div>
                  </div>
                </>
              )}
              {tab == "edit" && (
                <>
                  <textarea
                    className="textarea textarea-primary w-full rounded-3xl mb-1"
                    placeholder="Bio"
                    maxLength={130}
                    value={input}
                    onChange={handleInputChange}
                  ></textarea>
                  <select
                    className="select select-primary rounded-3xl w-full"
                    value={ctaOption}
                    onChange={e => setCtaOption(parseInt(e.target.value))}
                  >
                    <option disabled>Call to action?</option>
                    <option value={0}>Pay now</option>
                    <option value={1}>Follow me</option>
                  </select>
                  <div className="btn btn-primary w-full mt-2" onClick={() => setTab("preview")}>
                    Preview
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
