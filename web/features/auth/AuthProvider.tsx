"use client";

import { createContext, use, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ApiError, hasAccessToken, refreshAccessToken, setSessionExpiredHandler } from "@/lib/api";
import type { Action, FunctionCode } from "@/lib/permissions";
import { getMe, logout as logoutRequest } from "./auth.api";
import type { Me } from "./auth.types";

type AuthContextValue = {
  user: Me;
  can: (fn: FunctionCode, action: Action) => boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<Me | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Đây là chỗ chặn trang duy nhất: cookie refreshToken thuộc domain API nên server Next không đọc được
  useEffect(() => {
    setSessionExpiredHandler(() => router.replace("/login"));

    // F5 làm mất token trong memory: lấy lại bằng refresh cookie
    const ready = hasAccessToken() ? Promise.resolve() : refreshAccessToken();
    ready
      .then(getMe)
      .then(setUser)
      .catch((err: unknown) => {
        // Chỉ hết phiên (401) mới về login; 404/500/mất mạng thì hiện lỗi để còn biết mà sửa
        if (err instanceof ApiError && err.status === 401) router.replace("/login");
        else setError(err instanceof Error ? err.message : "Unexpected error");
      });

    return () => setSessionExpiredHandler(null);
  }, [router]);

  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!user) return null;

  const value: AuthContextValue = {
    user,
    can: (fn, action) => user.permissions.includes(`${fn}:${action}`),
    logout: async () => {
      await logoutRequest();
      router.replace("/login");
    },
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  const ctx = use(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
