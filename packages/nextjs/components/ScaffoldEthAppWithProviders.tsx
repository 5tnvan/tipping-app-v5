"use client";

import { useEffect, useState } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { useTheme } from "next-themes";
import { WagmiConfig } from "wagmi";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return <>{children}</>;
};

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  //const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";
  //const subgraphUriEthereumSepolia = "https://api.studio.thegraph.com/query/68297/wildpay-sepolia-v4/0.0.1";
  //const subgraphUriEthereumMainnet = "https://api.studio.thegraph.com/query/68297/wildpay-eth-mainnet/0.0.1";
  //const subgraphUriBaseSepolia = "https://api.studio.thegraph.com/query/68297/wildpay-base-sepolia/0.0.1";
  //const subgraphUriBaseMainnet = "https://api.studio.thegraph.com/query/68297/wildpay-base-mainnet/0.0.1";
  // https://api.studio.thegraph.com/query/68297/wildpay-fuse-testnet/version/latest

  const client = new ApolloClient({
    uri: undefined,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <WagmiConfig config={wagmiConfig}>
        <ProgressBar />
        <RainbowKitProvider
          chains={appChains.chains}
          avatar={BlockieAvatar}
          theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
        >
          <ScaffoldEthApp>{children}</ScaffoldEthApp>
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloProvider>
  );
};
