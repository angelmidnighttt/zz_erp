import { afterEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { ApiError, api, setAccessToken, setSessionExpiredHandler } from "../../lib/api.ts";

const reply = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const mockFetch = (handler: (url: string, init?: RequestInit) => Response) =>
  mock.method(globalThis, "fetch", async (input: string | URL | Request, init?: RequestInit) =>
    handler(String(input), init),
  );

afterEach(() => {
  mock.restoreAll();
  setAccessToken(null);
  setSessionExpiredHandler(null);
});

describe("api", () => {
  it("returns data from the success envelope", async () => {
    mockFetch(() => reply(200, { success: true, data: { id: "1" } }));
    assert.deepEqual(await api.get("/x"), { id: "1" });
  });

  it("maps validation errors to fields", async () => {
    mockFetch(() => reply(400, { success: false, code: 400, message: { body: { email: ["Invalid email"] } } }));
    await assert.rejects(
      api.post("/auth/login", {}, { retry: false }),
      (err) => err instanceof ApiError && err.status === 400 && err.fields?.email?.[0] === "Invalid email",
    );
  });

  it("refreshes once for parallel 401s then retries", async () => {
    setAccessToken("old");
    const urls: string[] = [];
    mockFetch((url, init) => {
      urls.push(url);
      if (url.endsWith("/auth/refresh")) return reply(200, { success: true, data: { accessToken: "new" } });
      const auth = new Headers(init?.headers).get("Authorization");
      return auth === "Bearer new"
        ? reply(200, { success: true, data: "ok" })
        : reply(401, { success: false, code: 401, message: "Unauthorized" });
    });

    assert.deepEqual(await Promise.all([api.get("/a"), api.get("/b")]), ["ok", "ok"]);
    assert.equal(urls.filter((url) => url.endsWith("/auth/refresh")).length, 1);
  });

  it("calls the session-expired handler when refresh fails", async () => {
    let expired = false;
    setSessionExpiredHandler(() => {
      expired = true;
    });
    mockFetch(() => reply(401, { success: false, code: 401, message: "Unauthorized" }));

    await assert.rejects(api.get("/a"), ApiError);
    assert.equal(expired, true);
  });

  it("does not refresh when retry is false", async () => {
    const urls: string[] = [];
    mockFetch((url) => {
      urls.push(url);
      return reply(401, { success: false, code: 401, message: "Invalid username or password" });
    });

    await assert.rejects(api.post("/auth/login", {}, { retry: false }), ApiError);
    assert.equal(urls.length, 1);
    assert.ok(urls[0].endsWith("/api/v1/auth/login"));
  });
});
