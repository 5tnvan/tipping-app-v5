"use client";

import { useContext } from "react";
import { Balance } from "../Balance";
// @refresh reset
import { AddressInfoDropdown } from "./AddressInfoDropdown";
import { AddressQRCodeModal } from "./AddressQRCodeModal";
import { WrongNetworkDropdown } from "./WrongNetworkDropdown";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Address } from "viem";
import { CheckBadgeIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { AppContext } from "~~/app/context";
import { useAutoConnect } from "~~/hooks/scaffold-eth/useAutoConnect";
import { useNetworkColor } from "~~/hooks/scaffold-eth/useNetworkColor";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import "~~/styles/app.css";
import { getBlockExplorerAddressLink } from "~~/utils/scaffold-eth";

type RainbowKitCustomConnectButtonProps = {
  btn: string;
};
/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const RainbowKitCustomConnectButtonForAdmin = ({ btn }: RainbowKitCustomConnectButtonProps) => {
  useAutoConnect();
  const networkColor = useNetworkColor();
  const { targetNetwork } = useTargetNetwork();
  const { profile } = useContext(AppContext);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const connected = mounted && account && chain;
        const blockExplorerAddressLink = account
          ? getBlockExplorerAddressLink(targetNetwork, account.address)
          : undefined;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <button
                    className={`${
                      btn == "small" ? "btn-sm" : "w-full"
                    } btn btn-accent bg-gradient-to-r from-cyan-600 via-lime-500 text-black`}
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported || chain.id !== targetNetwork.id) {
                return <WrongNetworkDropdown />;
              }

              return (
                <>
                  <div className="flex flex-col items-center mr-1">
                    <Balance address={account.address as Address} className="min-h-0 h-auto" />
                    <span className="text-xs" style={{ color: networkColor }}>
                      {chain.name}
                    </span>
                  </div>
                  <AddressInfoDropdown
                    address={account.address as Address}
                    displayName={account.displayName}
                    ensAvatar={account.ensAvatar}
                    blockExplorerAddressLink={blockExplorerAddressLink}
                    btn={btn}
                  />
                  <AddressQRCodeModal address={account.address as Address} modalId="qrcode-modal" />
                  {profile.wallet_id && profile.wallet_id !== account.address && (
                    <>
                      <div className="flex pl-1 text-red-600">
                        <ExclamationCircleIcon width={20} />
                      </div>
                    </>
                  )}
                  {profile.wallet_id && profile.wallet_id == account.address && (
                    <>
                      <div className="flex pl-1 text-green-600">
                        <CheckBadgeIcon width={20} />
                      </div>
                    </>
                  )}
                </>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
