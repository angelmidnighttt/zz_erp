import "../../setup.js";
import { describe, it, before, after, afterEach, mock } from "node:test";
import assert from "node:assert/strict";
import app from "../../../src/app.js";
import database from "../../../src/shared/db/database.js";
import AuthRepo from "../../../src/modules/auth/auth.repo.js";
import { hashPassword } from "../../../src/shared/utils/password.js";

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}/api/v1`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await database.destroy();
});

afterEach(() => mock.restoreAll());

const post = (path, body, headers = {}) =>
  fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });

describe("routes", () => {
  it("returns 404 for unknown routes", async () => {
    const res = await fetch(`${baseUrl}/unknown`);

    assert.equal(res.status, 404);
    assert.deepEqual(await res.json(), {
      success: false,
      code: 404,
      message: "Route not found",
    });
  });
});

describe("POST /auth/login", () => {
  it("returns 400 when the body is invalid", async () => {
    const res = await post("/auth/login", { email: "not-an-email" });
    const body = await res.json();

    assert.equal(res.status, 400);
    assert.ok(body.message.body.email);
    assert.ok(body.message.body.password);
  });

  it("returns tokens and sets the refresh token cookie", async () => {
    const passwordHash = await hashPassword("secret123");
    mock.method(AuthRepo, "getUserByEmail", async () => ({
      id: "3f101555-3082-4588-aa3a-6428d5ae7350",
      email: "a@localhost.com",
      password_hash: passwordHash,
    }));
    mock.method(AuthRepo, "updateLastLogin", async () => {});

    const res = await post("/auth/login", {
      email: "a@localhost.com",
      password: "secret123",
    });
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(body.success, true);
    assert.ok(body.data.token.accessToken);
    const cookie = res.headers.get("set-cookie");
    assert.match(cookie, /refreshToken=/);
    assert.match(cookie, /HttpOnly/);
  });
});

describe("authenticated routes", () => {
  const payload = {
    email: "new@localhost.com",
    username: "new",
    fullName: "New User",
    password: "secret123",
  };

  it("returns 401 without an Authorization header", async () => {
    const res = await post("/auth/user", payload);
    assert.equal(res.status, 401);
  });

  it("returns 401 when the scheme is not Bearer", async () => {
    const res = await post("/auth/user", payload, { authorization: "Basic abc" });
    assert.equal(res.status, 401);
  });

  it("returns 401 for an invalid token", async () => {
    const res = await post("/auth/user", payload, {
      authorization: "Bearer invalid.token.value",
    });
    assert.equal(res.status, 401);
  });
});
