/**
 * FUNCTION: convertUsdToFuse()
 * RETURN: Fuse / Spark
 **/
export const convertUsdToFuse = (value: any, nativeCurrencyPrice: any) => {
  // Convert USD to ETH using the nativeCurrencyPrice
  const calculatedFuseAmount = value / nativeCurrencyPrice;

  // Round to 8 decimal places (adjust as needed)
  const roundedEthAmount = parseFloat(calculatedFuseAmount.toFixed(8));

  return roundedEthAmount;
};
