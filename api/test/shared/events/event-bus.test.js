import "../../setup.js";
import { describe, it, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert/strict";
import database from "../../../src/shared/db/database.js";
import transaction from "../../../src/shared/db/transaction.js";
import { EventBus } from "../../../src/shared/events/event-bus.js";

// Gia lap knex.transaction: rollback khi callback throw, khong can DB that
const fakeTrx = { name: "fake-trx" };
let rolledBack;

beforeEach(() => {
  rolledBack = false;
  mock.method(database, "transaction", async (callback) => {
    try {
      return await callback(fakeTrx);
    } catch (err) {
      rolledBack = true;
      throw err;
    }
  });
});

afterEach(() => mock.restoreAll());

describe("transaction.run", () => {
  it("exposes the transaction to db() callers and reuses it when nested", async () => {
    assert.equal(transaction.current(), database);

    await transaction.run(async () => {
      assert.equal(transaction.current(), fakeTrx);
      await transaction.run(async () => {
        assert.equal(transaction.current(), fakeTrx);
      });
    });

    assert.equal(database.transaction.mock.callCount(), 1);
    assert.equal(transaction.current(), database);
  });
});

describe("EventBus", () => {
  it("runs handlers in order inside the emitter's transaction", async () => {
    const bus = new EventBus();
    const calls = [];
    bus.on("order.created", async (payload) => {
      calls.push(["first", payload, transaction.current()]);
    });
    bus.on("order.created", async (payload) => {
      calls.push(["second", payload, transaction.current()]);
    });

    await transaction.run(() => bus.emit("order.created", { id: 1 }));

    assert.deepEqual(calls, [
      ["first", { id: 1 }, fakeTrx],
      ["second", { id: 1 }, fakeTrx],
    ]);
  });

  it("rolls back the whole transaction when a handler throws", async () => {
    const bus = new EventBus();
    const second = mock.fn();
    bus.on("order.created", async () => {
      throw new Error("handler failed");
    });
    bus.on("order.created", second);

    await assert.rejects(
      transaction.run(() => bus.emit("order.created", {})),
      /handler failed/,
    );
    assert.equal(rolledBack, true);
    assert.equal(second.mock.callCount(), 0);
  });

  it("rejects emit outside a transaction", async () => {
    const bus = new EventBus();
    bus.on("order.created", mock.fn());

    await assert.rejects(bus.emit("order.created", {}), /inside transaction\.run/);
  });

  it("does nothing for events without handlers", async () => {
    const bus = new EventBus();
    await transaction.run(() => bus.emit("nobody.listens", {}));
  });
});
