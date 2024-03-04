"use client";

import { use, useEffect, useState } from "react";
import { LoginIcon } from "./assets/LoginIcon";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { logout } from "~~/app/login/actions";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { useAuthentication } from "~~/hooks/app/useAuthentication";
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

  const { isAuth, profile, refetch } = useAuthentication();

  const handleLogout = () => {
    logout();
    refetch();
  };

  return (
    <>
      <div className="min-h-screen custom-gradient-01">
        <Header />
        <main className="flex justify-center h-screen pt-10">
          <div className="app rounded-t-2xl p-10 flex flex-col relative custom-gradient-02">
            <div className="flex justify-between mb-10 z-10">
              <div className="flex items-center">
                <img src="/wildpay-logo.svg" width={30} height={30}></img>
                <h1 className="font-semibold custom-text-blue ml-2">wildpay</h1>
              </div>
              {isAuth == "yes" && (
                <div className="btn btn-primary" onClick={handleLogout}>
                  <LoginIcon />
                  {profile.username}
                </div>
              )}
              {isAuth == "no" && (
                <div className="btn btn-primary">
                  <LoginIcon />
                  Login
                </div>
              )}
            </div>
            {children}
          </div>
        </main>
        <Footer />
      </div>
      {/* <Toaster /> */}
    </>
  );
};

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";
  const apolloClient = new ApolloClient({
    uri: subgraphUri,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={apolloClient}>
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
