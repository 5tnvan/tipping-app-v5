import { useState } from "react";
import { CopyIcon } from "../assets/CopyIcon";
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
        <div className="scr-item custom-bg-image-01 flex items-center relative">
          <div className=" text-6xl font-black custom-difference-blend">{username}</div>
          <div
            className="absolute btn btn-accent url h-8 min-h-8 bg-gradient-to-r from-cyan-600 via-lime-500 border-0"
            onClick={handleCopyToClipboard}
          >
            <div className="flex items-center">
              {copied ? (
                <>
                  <span className="mr-1">Copied</span>
                  <span className="text-secondary">
                    <CheckCircleIcon width={20} />
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
