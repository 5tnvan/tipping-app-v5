import { defineChain } from "viem";

export const neoTestnet = defineChain({
  id: 12227332,
  name: "Neo X Testnet T4",
  network: "neo-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Gas",
    symbol: "GAS",
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.rpc.banelabs.org/"],
    },
    public: {
      http: ["https://testnet.rpc.banelabs.org/"],
    },
  },
  blockExplorers: {
    default: { name: "neox-scan", url: "https://xt4scan.ngd.network/" },
  },
});
// export const neoTestnet = /*#__PURE__*/ defineChain({
//   id: 12227332,
//   name: 'Neo X Testnet T4',
//   nativeCurrency: { name: 'Gas', symbol: 'GAS', decimals: 18 },
//   rpcUrls: {
//     default: {
//       http: ['https://testnet.rpc.banelabs.org/'],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'neox-scan',
//       url: 'https://xt4scan.ngd.network',
//     },
//   },
//   testnet: true,
// })