# Kinnect App
Ready to connect?

<h4 align="center">
  <a href="https://github.com/5tnvan/tipping-app-v5/">Github</a> |
  Production: <a href="https://www.wildpay.app">www.wildpay.app</a> |
  Testnet: <a href="https://www.wildpay.app">Testnet App</a> |
</h4>

>A first social payment dApp, enabling anyone to easily onboard into the cryptocurrency ecosystem. Create a profile, verify a wallet, and you are ready to receive payments from friends, family, and followers. Let kick-ass Web3 content creation tools help you go viral and be discovered along the way.

🧪 On a payment layer, it's designed as a Smart Contract, enabling users to:
- ✅ **Verify a Wallet**
- ✅ **Pay and receive ETH on Ethereum and Base**
- ✅ **Withdraw at anytime**

🧪 On a social layer, it enables a user to:
- ✅ **Claim a unique handle** [Example](https://wildpay.app/micalabs)
- ✅ **Level-up as a Web3 Creator**
- ✅ **Create Wild Bios, Wild NFTs & Wildfires**
- ✅ **Be discovered via viral algorithms**
- ✅ **Keep 100% of their earnings**

## ⚙️ Set-up

>The app is built using [Scaffold-Eth-2](https://github.com/scaffold-eth/scaffold-eth-2) (NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript), [Subgraph](https://github.com/graphprotocol), [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts) and [Supabase Auth](https://github.com/supabase/supabase).

To set up:
1. Clone this repo & install dependencies

```
git clone https://github.com/5tnvan/tipping-app-v5
cd tipping-app-v5
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

4. You must create an env.local file and put your Supabase keys into this for the app to run. Or ask tran@micalabs.org for help.
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## 🟢 Smart Contracts

Our Smart Contracts are verified on chain!

### Base: 
- https://basescan.org/address/0x3579b02193028357acafe8323d2f62155078033a

### Ethereum:
- https://etherscan.io/address/0x3579b02193028357acafe8323d2f62155078033a

## 🟢 Subgraph

We index our Smart Contracts and query this data from our front-end app! 

### Base
- https://github.com/5tnvan/tipping-app-v5/tree/main/packages/subgraph/wildpay-base-mainnet (Source Code)
- https://thegraph.com/studio/subgraph/wildpay-base-mainnet/ (Subgraph code)
- https://api.studio.thegraph.com/query/68297/wildpay-base-mainnet/version/latest (API Endpoint)
### Ethereum
- https://github.com/5tnvan/tipping-app-v5/tree/main/packages/subgraph/wildpay-base-mainnet (Source code)
- https://thegraph.com/studio/subgraph/wildpay-eth-mainnet/ (Subgraph Studio)
- https://api.studio.thegraph.com/query/68297/wildpay-eth-mainnet/version/latest (API Endpoint)


## Got a question ❓
Write to tran@micalabs.org

Ask for help on https://t.me/wildpayapp
