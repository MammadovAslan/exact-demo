import { create } from "zustand";

export const useQueriesStore = create((set) => ({
  queries: {
    brand: [],
    width: [],
    aspectRatio: [],
    rimDiameter: [],
    minPrice: 0,
    maxPrice: 0,
  },
  setQueries: (payload) => set({ queries: payload }),
}));
