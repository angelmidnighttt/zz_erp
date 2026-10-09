import type { ReactNode } from "react";
import { AuthProvider } from "@/features/auth/AuthProvider";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
