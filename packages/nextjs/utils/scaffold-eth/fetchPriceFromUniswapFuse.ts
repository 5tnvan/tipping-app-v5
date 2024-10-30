import { CurrencyAmount, Token } from "@uniswap/sdk-core";
import { Pair, Route } from "@uniswap/v2-sdk";
import { Address, createPublicClient, http, parseAbi } from "viem";
import { mainnet } from "wagmi";
// Use Ethereum mainnet
import scaffoldConfig from "~~/scaffold.config";

const publicClient = createPublicClient({
  chain: mainnet, // Targeting Ethereum mainnet
  transport: http(`${mainnet.rpcUrls.alchemy.http[0]}/${scaffoldConfig.alchemyApiKey}`),
});

const ABI = parseAbi([
  "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
  "function token0() external view returns (address)",
  "function token1() external view returns (address)",
]);

export const fetchFusePriceFromUniswap = async (): Promise<number> => {
  // Fuse token address on Ethereum
  const fuseTokenAddress = "0x970B9bB2C0444F5E81e9d0eFb84C8ccdcdcAf84d";
  // USDC token address on Ethereum
  const usdcTokenAddress = "0x28C3d1cD466Ba22f6cae51b1a4692a831696391A";

  try {
    const FUSE = new Token(1, fuseTokenAddress, 18); // Ethereum mainnet (chainId: 1)
    const USDC = new Token(1, usdcTokenAddress, 6); // Ethereum mainnet (chainId: 1)

    const pairAddress = Pair.getAddress(FUSE, USDC) as Address;

    const wagmiConfig = {
      address: pairAddress,
      abi: ABI,
    };

    // Fetch reserves from the Uniswap pair contract
    const reserves = await publicClient.readContract({
      ...wagmiConfig,
      functionName: "getReserves",
    });

    const token0Address = await publicClient.readContract({
      ...wagmiConfig,
      functionName: "token0",
    });

    const token1Address = await publicClient.readContract({
      ...wagmiConfig,
      functionName: "token1",
    });

    // Find the correct token order
    const token0 = [FUSE, USDC].find(token => token.address === token0Address);
    const token1 = [FUSE, USDC].find(token => token.address === token1Address);

    if (!token0 || !token1) {
      console.error("Token matching failed");
      return 0;
    }

    // Create a Uniswap pair and route to get the mid price
    const pair = new Pair(
      CurrencyAmount.fromRawAmount(token0, reserves[0].toString()),
      CurrencyAmount.fromRawAmount(token1, reserves[1].toString()),
    );

    const route = new Route([pair], FUSE, USDC);
    const price = parseFloat(route.midPrice.toSignificant(6));

    console.log(`Fuse token price: ${price} USD`);
    return price;
  } catch (error) {
    console.error(`Error fetching Fuse price:`, error);
    return 0;
  }
};
