import { useEffect, useState } from "react";
import { useTargetNetwork } from "./useTargetNetwork";
import { useInterval } from "usehooks-ts";
import scaffoldConfig from "~~/scaffold.config";
import { fetchPriceFromFuseAPI } from "~~/utils/scaffold-eth/fetchPriceFromFuseAPI";

const enablePolling = true; // Enable or disable polling as needed

/**
 * Get the price of Fuse Currency using the Fuse Trade API
 */
export const useFuseCurrencyPrice = () => {
  const { targetNetwork } = useTargetNetwork();
  const [fuseCurrencyPrice, setFuseCurrencyPrice] = useState(0);

  // Get the price of FUSE from Coingecko on mount
  useEffect(() => {
    (async () => {
      const price = await fetchPriceFromFuseAPI(targetNetwork);
      setFuseCurrencyPrice(price);
      console.log("Fetched ETH price:", price); // Log the fetched price
    })();
  }, [targetNetwork]);

  // Poll the price of FUSE at a given interval
  useInterval(
    async () => {
      const price = await fetchPriceFromFuseAPI(targetNetwork);
      setFuseCurrencyPrice(price);
    },
    enablePolling ? scaffoldConfig.pollingInterval : null, // Use polling interval from config if polling is enabled
  );

  return fuseCurrencyPrice;
};
