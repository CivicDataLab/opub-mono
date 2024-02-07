import { create } from 'zustand';

type multiSelectRegions = {
  regions: any[];
  setRegions: (regions: string[]) => void;
};

export const useAddedRegions = create<multiSelectRegions>((set) => ({
  regions: [],
  setRegions: (regions) => {
    // console.log("STORE --> regions: ", regions[0].value);
    set({ regions });
  },
}));
