import { defineChain } from "viem";

export const neo = defineChain({
  id: 47763,
  name: "Neo X Mainnet",
  network: "neo-mainnet",
  nativeCurrency: {
    decimals: 18,
    name: "Gas",
    symbol: "GAS",
  },
  rpcUrls: {
    default: {
      http: ["https://mainnet-1.rpc.banelabs.org, https://mainnet-2.rpc.banelabs.org"],
    },
    public: {
      http: ["https://mainnet-1.rpc.banelabs.org"],
    },
  },
  blockExplorers: {
    default: { name: "Neo X - Explorer", url: "https://xexplorer.neo.org" },
  },
});
