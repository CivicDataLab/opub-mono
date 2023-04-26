"use client";

import { Toaster, Tooltip } from "@opub-cdl/ui";
import { SSRProvider } from "react-aria";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SSRProvider>
      <Tooltip.Provider>
        {children}
        <Toaster />
      </Tooltip.Provider>
    </SSRProvider>
  );
}
