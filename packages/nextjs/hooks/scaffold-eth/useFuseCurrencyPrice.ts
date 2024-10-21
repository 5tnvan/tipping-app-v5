import { useEffect, useState } from "react";
import { fetchFusePriceFromAPI } from "~~/utils/scaffold-eth/fetchPriceFromFuseAPI";

/**
 * Get the price of Fuse Currency using the Fuse Trade API
 */
export const useFuseCurrencyPrice = () => {
  const [fuseCurrencyPrice, setFuseCurrencyPrice] = useState(0);

  // Get the price of FUSE from CoinGecko on mount
  useEffect(() => {
    (async () => {
      const price = await fetchFusePriceFromAPI();
      setFuseCurrencyPrice(price);
    })();
  }, []);
  return fuseCurrencyPrice;
};
