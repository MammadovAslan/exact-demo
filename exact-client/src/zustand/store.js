import { create } from "zustand";

export const useQueriesStore = create((set) => ({
  queries: {
    brand: [],
    width: 0,
    aspectRatio: 0,
    rimDiameter: 0,
    minPrice: 0,
    maxPrice: 0,
  },
  setQueries: (payload) => set({ queries: payload }),
}));
