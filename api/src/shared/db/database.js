import knex from "knex";
import knexConfig from "../../../knexfile.js";
import { logger } from "../logger/logger.js";

// dung chung config voi knexfile de app va CLI migrate khong bi lech nhau
const database = knex(knexConfig[process.env.NODE_ENV || "development"]);

// log db chi ghi cau sql thoi nha ae, khong log du lieu, tranh rui ro
const SLOW_QUERY_MS = 1000;
const startedAt = new Map();

database.on("query", (query) =>
  startedAt.set(query.__knexQueryUid, performance.now()),
);
database.on("query-response", (query) => {
  const ms = performance.now() - startedAt.get(query.__knexQueryUid);
  if (ms > SLOW_QUERY_MS)
    logger.warn(
      { type: "slow_query", ms: Math.round(ms), sql: query.sql },
      "slow query",
    );
});
database.on("query-error", (err) => logger.error(err, "db error"));

// cai nay chac de tu tu xem lai sau vay
export default database;
//tam thoi de do da
//ae log them cai luc start server xem no mo len , sap, tat ra sao nha, minh bo qua
//voi lai kiem cai lib nao de cut off log, chu nhieu qua khong duoc, tam thoi dung o day, di vao feat truoc da
