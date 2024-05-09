"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BaseIcon } from "~~/components/assets/BaseIcon";
import { EthIcon } from "~~/components/assets/EthIcon";

/**
 * Returns network icon of currently connected network
 */
export const RainbowKitCustomNetworkIcon = () => {
  return (
    <ConnectButton.Custom>
      {({ chain }) => {
        return (
          <>
            {chain?.name == "Ethereum" && <EthIcon width={14} height={14} fill="#3C3C3C" />}
            {chain?.name == "Sepolia" && <EthIcon width={14} height={14} fill="#3C3C3C" />}
            {chain?.name == "Base" && <BaseIcon width={14} height={10} fill="#3C3C3C" />}
            {chain?.name == "Base Sepolia" && <BaseIcon width={14} height={10} fill="#3C3C3C" />}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
