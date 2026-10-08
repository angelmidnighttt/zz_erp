import "../../setup.js";
import { describe, it, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert/strict";
import AuthRepo from "../../../src/modules/auth/auth.repo.js";
import authService from "../../../src/modules/auth/auth.service.js";
import ApiError from "../../../src/shared/utils/ApiError.js";
import { hashPassword, comparePassword } from "../../../src/shared/utils/password.js";
import { verifyAccessToken } from "../../../src/shared/utils/jwt.js";
import transaction from "../../../src/shared/db/transaction.js";
import eventBus from "../../../src/shared/events/event-bus.js";
import { AUTH_EVENTS } from "../../../src/modules/auth/auth.events.js";

const USER_ID = "3f101555-3082-4588-aa3a-6428d5ae7350";

afterEach(() => mock.restoreAll());

// Khong can DB: transaction.run chay thang fn, emit chi ghi nhan event da phat
let emit;
const mockTransaction = () => {
  mock.method(transaction, "run", (fn) => fn());
  emit = mock.method(eventBus, "emit", async () => {});
};

describe("AuthService.login", () => {
  it("throws 404 when the email does not exist", async () => {
    mock.method(AuthRepo, "getUserByEmail", async () => undefined);

    await assert.rejects(
      authService.login({ email: "none@localhost.com", password: "x" }),
      (err) => err instanceof ApiError && err.statusCode === 404,
    );
  });

  it("throws 401 when the password is wrong", async () => {
    const passwordHash = await hashPassword("correct-password");
    mock.method(AuthRepo, "getUserByEmail", async () => ({
      id: USER_ID,
      email: "a@localhost.com",
      password_hash: passwordHash,
    }));
    const updateLastLogin = mock.method(AuthRepo, "updateLastLogin", async () => {});

    await assert.rejects(
      authService.login({ email: "a@localhost.com", password: "wrong" }),
      (err) => err instanceof ApiError && err.statusCode === 401,
    );
    assert.equal(updateLastLogin.mock.callCount(), 0);
  });

  it("returns tokens and updates last login on success", async () => {
    const passwordHash = await hashPassword("secret123");
    const getUserByEmail = mock.method(AuthRepo, "getUserByEmail", async () => ({
      id: USER_ID,
      email: "a@localhost.com",
      password_hash: passwordHash,
    }));
    const updateLastLogin = mock.method(AuthRepo, "updateLastLogin", async () => {});

    const result = await authService.login({
      email: "a@localhost.com",
      password: "secret123",
    });

    assert.deepEqual(getUserByEmail.mock.calls[0].arguments, [
      { email: "a@localhost.com" },
    ]);
    assert.deepEqual(updateLastLogin.mock.calls[0].arguments, [{ userId: USER_ID }]);
    assert.equal(result.id, USER_ID);
    assert.equal(verifyAccessToken(result.token.accessToken).id, USER_ID);
    assert.ok(result.token.refreshToken);
  });
});

describe("AuthService.createUser", () => {
  const payload = {
    email: "new@localhost.com",
    username: "new",
    fullName: "New User",
    password: "secret123",
  };

  beforeEach(mockTransaction);

  it("throws 400 when the email is already used", async () => {
    mock.method(AuthRepo, "getUserByEmail", async () => ({ id: USER_ID }));
    const createUser = mock.method(AuthRepo, "createUser", async () => ({}));

    await assert.rejects(
      authService.createUser(payload),
      (err) => err instanceof ApiError && err.statusCode === 400,
    );
    assert.equal(createUser.mock.callCount(), 0);
    assert.equal(emit.mock.callCount(), 0);
  });

  it("hashes the password before passing it to the repo", async () => {
    mock.method(AuthRepo, "getUserByEmail", async () => undefined);
    const createUser = mock.method(AuthRepo, "createUser", async (data) => ({
      id: USER_ID,
      email: data.email,
    }));

    const user = await authService.createUser(payload);

    const [arg] = createUser.mock.calls[0].arguments;
    assert.equal(arg.email, payload.email);
    assert.equal(arg.username, payload.username);
    assert.equal(arg.fullName, payload.fullName);
    assert.equal(arg.password, undefined);
    assert.ok(await comparePassword(payload.password, arg.passwordHash));
    assert.deepEqual(user, { id: USER_ID, email: payload.email });
  });

  it("emits USER_CREATED inside the transaction", async () => {
    mock.method(AuthRepo, "getUserByEmail", async () => undefined);
    mock.method(AuthRepo, "createUser", async () => ({ id: USER_ID }));

    await authService.createUser(payload);

    assert.equal(transaction.run.mock.callCount(), 1);
    assert.deepEqual(emit.mock.calls[0].arguments, [
      AUTH_EVENTS.USER_CREATED,
      { user: { id: USER_ID } },
    ]);
  });
});

describe("AuthService.assignRoles", () => {
  beforeEach(mockTransaction);

  it("passes userId and rolesId to the repo as an object", async () => {
    const rolesId = ["ba06a758-ffac-4287-91e1-b2f2601dde84"];
    const assignRoles = mock.method(AuthRepo, "assignRoles", async () => []);

    await authService.assignRoles({ userId: USER_ID, rolesId });

    assert.deepEqual(assignRoles.mock.calls[0].arguments, [
      { userId: USER_ID, rolesId },
    ]);
    assert.deepEqual(emit.mock.calls[0].arguments, [
      AUTH_EVENTS.ROLES_ASSIGNED,
      { userId: USER_ID, rolesId },
    ]);
  });
});
