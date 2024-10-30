import { useEffect, useState } from "react";
import { fetchPriceFromFuseAPI } from "~~/utils/scaffold-eth/fetchPriceFromFuseAPI";
// import { useInterval } from "usehooks-ts";
// import scaffoldConfig from "~~/scaffold.config";

//const enablePolling = true;

/**
 * Get the price of Fuse Currency using the Fuse Trade API
 */
export const useFuseCurrencyPrice = () => {
  const [fuseCurrencyPrice, setFuseCurrencyPrice] = useState(0);

  // Get the price of FUSE from Coingecko on mount
  useEffect(() => {
    (async () => {
      const price = await fetchPriceFromFuseAPI();
      setFuseCurrencyPrice(price);
    })();
  }, []);

  // Poll the price of FUSE at a given interval
  // useInterval(
  //   async () => {
  //     const price = await fetchPriceFromFuseTradeAPI();
  //     setFuseCurrencyPrice(price);
  //   },
  //   enablePolling ? scaffoldConfig.pollingInterval : null, // Use polling interval from config if polling is enabled
  // );

  return fuseCurrencyPrice;
};
