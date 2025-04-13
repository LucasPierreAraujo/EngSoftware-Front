"use client";

import { useTokenRefresh } from "@/hooks/use-token-refresh";

export function TokenRefreshProvider({ children }) {
  useTokenRefresh();
  return children;
}
