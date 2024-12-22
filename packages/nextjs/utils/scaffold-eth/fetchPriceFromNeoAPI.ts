/**
 * Fetch the Neo token price using the Neo Testnet API with the fetch API.
 * @returns {Promise<number>} - The price of the Neo token in USD
 */
export const fetchPriceFromNeoAPI = async (): Promise<number> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=neo&vs_currencies=usd", // Neo token on CoinGecko
        requestOptions
      );

      if (!response.ok) {
        console.error("HTTP error, status =", response.status);
        return 0; // Return 0 if there's an error in fetching
      }

      const result = await response.json();
      const price = result["neo"]?.usd || 0;  // Get Neo price in USD
      console.log("Neo price", price);
      return price;
    } catch (error) {
      console.error("Error fetching Neo price:", error);
      return 0; // Return 0 if there's an error
    }
  } catch (error) {
    console.error(`Error fetching Neo price from Neo Testnet API:`, error);
    return 0;
  }
};
