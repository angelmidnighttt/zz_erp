import transaction from "../db/transaction.js";

// Event bus trong cung process: emit goi lan luot tung handler va doi chung xong,
// cac handler chay chung transaction voi noi emit (db() tu lay trx hien tai).
// Handler throw -> emit throw -> transaction rollback ca du lieu cua noi emit lan cac handler.
// Handler chi nen ghi DB; viec ra ngoai (gui email, goi API) thi ghi vao outbox de chay sau khi commit.
export class EventBus {
  #handlers = new Map();

  on(eventName, handler) {
    const handlers = this.#handlers.get(eventName) ?? [];
    handlers.push(handler);
    this.#handlers.set(eventName, handlers);
  }

  async emit(eventName, payload) {
    // bat buoc nam trong transaction.run() de event va du lieu cung commit / rollback
    if (!transaction.isActive()) {
      throw new Error(`emit("${eventName}") must be called inside transaction.run()`);
    }
    for (const handler of this.#handlers.get(eventName) ?? []) {
      await handler(payload);
    }
  }
}

export default new EventBus();
