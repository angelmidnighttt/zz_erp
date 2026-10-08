import { AsyncLocalStorage } from "node:async_hooks";
import database from "./database.js";

// Giu transaction dang chay theo tung request (async context), repo khong can truyen trx qua tham so
const storage = new AsyncLocalStorage();

class TransactionManager {
  // trx dang chay neu co, khong thi tra ve knex goc
  current() {
    return storage.getStore() ?? database;
  }

  isActive() {
    return storage.getStore() !== undefined;
  }

  // Chay fn trong 1 transaction: fn xong thi commit, fn throw thi rollback.
  // Goi long nhau thi dung lai transaction ben ngoai, khong mo transaction moi.
  run(fn) {
    if (this.isActive()) return fn();
    return database.transaction((trx) => storage.run(trx, fn));
  }
}

const transaction = new TransactionManager();

// Query builder gan voi transaction hien tai: db("users").where(...)
export const db = (tableName) => transaction.current()(tableName);

export default transaction;
