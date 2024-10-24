/**
 * Fetch the Fuse token price using the Fuse Trade API with the fetch API.
 * @returns {Promise<number>} - The price of the Fuse token in USD
 */
export const fetchPriceFromFuseTradeAPI = async (): Promise<number> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // Fuse Trade API URL to fetch Fuse price in USD
    const apiURL = "https://api.fuse.io/api/v0/trade/price/0x970B9bB2C0444F5E81e9d0eFb84C8ccdcdcAf84d";

    try {
      const response = await fetch(apiURL, requestOptions);

      if (!response.ok) {
        console.error("HTTP error, status =", response.status);
        return 0; // Return 0 if there's an error in fetching
      }

      const result = await response.json();
      const priceData = result?.data?.find((item: any) => item.symbol === "FUSE");

      if (priceData && priceData.price_in_usd) {
        const price = priceData.price_in_usd;
        console.log("Fuse price in USD:", price);
        return price;
      } else {
        console.error("Price data for FUSE not found");
        return 0;
      }
    } catch (error) {
      console.error("Error fetching Fuse price:", error);
      return 0; // Return 0 if there's an error
    }
  } catch (error) {
    console.error("Error fetching Fuse price from Fuse API:", error);
    return 0;
  }
};
