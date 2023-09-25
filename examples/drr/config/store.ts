import { create } from 'zustand';
import { shallow } from 'zustand/shallow';

type NavigationProps = {
  isNavigating: boolean;
  setIsNavigation: (isNavigating: boolean) => void;
};

export const useIsNavigating = create<NavigationProps>((set) => ({
  isNavigating: false,
  setIsNavigation: (isNavigating) => set({ isNavigating }),
}));

export { shallow };
