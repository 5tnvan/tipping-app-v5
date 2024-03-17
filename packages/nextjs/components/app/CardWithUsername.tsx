import { CopyIcon } from "../assets/CopyIcon";

type Props = {
  username: string;
};

export const CardWithUsername = ({ username }: Props) => {
  return (
    <>
      {/* Scroll Snap */}
      <div className="scr mb-6">
        {/* Card 3 */}
        <div className="scr-item custom-bg-image-01 flex items-center relative">
          <div className=" text-6xl font-black custom-difference-blend">{username}</div>
          <div className="absolute url flex custom-bg-blue pt-2 pb-2 pr-3 pl-3 text-white rounded-full text-sm items-center">
            <div className="mr-2">wildpay.eth/{username}</div>
            <CopyIcon />
          </div>
        </div>
      </div>
    </>
  );
};
