"use client";

import { Toaster } from "@opub-cdl/ui";
import { SSRProvider } from "react-aria";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SSRProvider>
      {children}
      <Toaster />
    </SSRProvider>
  );
}
