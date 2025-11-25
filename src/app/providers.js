"use client";


import { ToastProvider } from "./context/ToastContext";
import { StoreProvider } from "./context/StoreContext";

export function Providers({ children }) {
  return (
    <ToastProvider>
      <StoreProvider>{children}</StoreProvider>
    </ToastProvider>
  );
}
