# Kinnect Wallet

<p align="center">
    <a href="https://www.kinnectwallet.com">
        <img src="https://www.3seconds.me/kinnect/kinnect-full-logo-blue.svg" border="0" width="30%">
    </a>
</p>
<p align="center">
    <a href="https://www.kinnectwallet.com">
        <img src="https://www.kinnectwallet.com/_next/image?url=%2Fkinnect01.png&w=2048&q=75" border="0" width="30%">
    </a>
</p>
<h4 align="center">
  <a href="https://www.kinnectwallet.com">www.kinnectwallet.com</a>
</h4>

>A Wallet For Kin, where every transaction connects.

🧪 On a payment layer, it's designed as a Smart Contract, enabling users to:
- ✅ **Verify a Wallet**
- ✅ **Pay and receive ETH/FUSE/GAS**
- ✅ **Switch chains: Ethereum, Base, Fuse and Neo X**
- ✅ **Instant withdrawal**

🧪 On a social layer, it enables a user to:
- ✅ **Claim a unique handle** [Example](https://kinnectwallet.com/spark)
- ✅ **Get verified badge**
- ✅ **Be discovered via viral algorithms**
- ✅ **Enjoy transparent accounting and proof-of-pay**

## ⚙️ Set-up

>The app is built using [Scaffold-Eth-2](https://github.com/scaffold-eth/scaffold-eth-2) (NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript), [Subgraph](https://github.com/graphprotocol), [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts) and [Supabase Auth](https://github.com/supabase/supabase).

To set up:
1. Clone this repo & install dependencies

```
git clone https://github.com/5tnvan/kinnect-app-v5
cd kinnect-app-v5
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

## 🟢 Smart Contracts

Our Smart Contracts are verified on chain!

### Base: 
- https://basescan.org/address/0x3579b02193028357acafe8323d2f62155078033a

### Ethereum:
- https://etherscan.io/address/0x3579b02193028357acafe8323d2f62155078033a

### Fuse: 
- https://explorer.fuse.io/address/0x3579B02193028357ACaFE8323d2F62155078033A

### Neo:
- https://xexplorer.neo.org/address/0x3579B02193028357ACaFE8323d2F62155078033A

## 🟢 Subgraph

We index our Smart Contracts usinf The Graph and query this data from our front-end app! 

### Base
- https://api.studio.thegraph.com/query/68297/wildpay-base-mainnet/version/latest (API Endpoint)
  
### Ethereum
- https://api.studio.thegraph.com/query/68297/wildpay-eth-mainnet/version/latest (API Endpoint)

### Fuse
- https://api.studio.thegraph.com/query/68297/wildpay-fuse-mainnet/version/latest (API Endpoint)
  
### Neo
- https://api.studio.thegraph.com/query/68297/wildpay-neo-mainnet/version/latest (API Endpoint)


## Got a question ❓
Write to tran@micalabs.org

Ask for help on https://t.me/wildpayapp
