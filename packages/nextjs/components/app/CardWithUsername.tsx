import { useState } from "react";
import { BaseIcon } from "../assets/BaseIcon";
import { CopyIcon } from "../assets/CopyIcon";
import { EthIcon } from "../assets/EthIcon";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

type Props = {
  username: any;
};

export const CardWithUsername = ({ username }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText("https://www.wildpay.app/" + username);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500); // Reset the copied state after 2 seconds
  };
  return (
    <>
      {/* Scroll Snap */}
      <div className="scr">
        {/* Card 3 */}
        <div className="scr-item custom-bg-image-01 flex items-center relative shadow-xl">
          <div className="absolute network flex">
            <div className="btn hover:bg-fuchsia-500 font-medium h-6 min-h-6 gap-0 bg-fuchsia-400 px-2 mr-1">
              <EthIcon width={14} height={14} fill="#3C3C3C" />
              ethereum
            </div>
            <div className="btn hover:bg-fuchsia-500 font-medium flex h-6 min-h-6 gap-0 bg-fuchsia-400 px-2">
              <BaseIcon width={10} height={10} fill="#3C3C3C" />
              <span className="pl-1">base</span>
            </div>
          </div>
          <div className=" text-6xl font-black custom-difference-blend">{username}</div>
          <div
            className="absolute btn btn-accent px-3 url h-8 min-h-8 bg-gradient-to-r from-cyan-600 via-lime-500 border-0"
            onClick={handleCopyToClipboard}
          >
            <div className="flex items-center">
              {copied ? (
                <>
                  <span className="mr-1">Copied</span>
                  <span className="text-secondary">
                    <CheckCircleIcon width={14} />
                  </span>
                </>
              ) : (
                <>
                  <span className="mr-1">wildpay.app/{username}</span>
                  <CopyIcon />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
