import { create } from "zustand";
import scaffoldConfig from "~~/scaffold.config";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type GlobalState = {
  nativeCurrencyPrice: number;
  setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;

  fuseCurrencyPrice: number;
  setFuseCurrencyPrice: (newFuseCurrencyPriceState: number) => void;

  neoCurrencyPrice: number;  // Added state for neoCurrencyPrice
  setNeoCurrencyPrice: (newNeoCurrencyPriceState: number) => void;  // Added setter for neoCurrencyPrice

  targetNetwork: ChainWithAttributes;
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => void;
};

export const useGlobalState = create<GlobalState>(set => ({
  nativeCurrencyPrice: 0,
  setNativeCurrencyPrice: (newValue: number): void => set(() => ({ nativeCurrencyPrice: newValue })),

  fuseCurrencyPrice: 0,
  setFuseCurrencyPrice: (newValue: number): void => set(() => ({ fuseCurrencyPrice: newValue })),

  neoCurrencyPrice: 0,  // Initialize neoCurrencyPrice
  setNeoCurrencyPrice: (newValue: number): void => set(() => ({ neoCurrencyPrice: newValue })),  // Set neoCurrencyPrice

  targetNetwork: scaffoldConfig.targetNetworks[0],
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => set(() => ({ targetNetwork: newTargetNetwork })),
}));
