"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api";
import { login } from "@/features/auth/auth.api";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<ApiError | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    setError(null);
    try {
      await login({ email: String(form.get("email")), password: String(form.get("password")) });
      router.replace("/");
    } catch (err) {
      if (!(err instanceof ApiError)) throw err;
      setError(err);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-24 flex max-w-sm flex-col gap-3">
      <input name="email" type="email" required className="rounded border px-3 py-2" />
      {error?.fields?.email && <p className="text-sm text-red-600">{error.fields.email[0]}</p>}
      <input name="password" type="password" required className="rounded border px-3 py-2" />
      {error && !error.fields && <p className="text-sm text-red-600">{error.message}</p>}
      <button disabled={pending} className="rounded bg-blue-600 py-2 text-white disabled:opacity-50">
        Đăng nhập
      </button>
    </form>
  );
}
