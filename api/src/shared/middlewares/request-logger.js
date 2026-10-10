// minh dung node 22, node 22 da co crypto roi nha mn, dung crypto de tao password_hash luon cung duoc :v
import { randomUUID } from "crypto";
import { logger } from "../logger/logger.js";
import { requestContext } from "../logger/request-context.js";

export const requestLogger = (req, res, next) => {
  // requestID nhan tu proxy nha ae, minh chua deploy nen chua lam ve tu proxy, nhung bao gio requestID cung nhan tu proxy, kieu reverse proxy nhu nginx, con neu deploy len cac cloud nhu lambda, hay render, hay cloud run cua gcp thi khoi can luon
  const requestId = req.get("x-request-id") ?? randomUUID();
  res.set("x-request-id", requestId);
  const startedAt = performance.now();
  res.on("finish", () => {
    //cai nao khong muon log thi loai ra luon
    if (req.path === "/health") return;
    const level =
      res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";
    logger[level](
      {
        type: "access",
        requestId,
        userId: req.user?.id,
        method: req.method,
        path: req.originalUrl.split("?")[0],
        ms: performance.now() - startedAt,
        status: res.statusCode,
        //ai thich log ip thi log
        //ip: req.ip,
      },
      "request",
    );
  });
  requestContext.run({ requestId }, next);
};

// cac ban lay source ve run check lai cung duoc, khong can code may cai du thua nay, may nay bao AI config cai la xong, ton thoi gian qua huhu :v
// nen lam luon cai log cho query slow, hay alert vao slack hay gui mail cho nay luon nhi
//ua nham, nay la log service, con cai log trong application cua minh la khac nha, kieu log de luu lai audit cua tung giao dich ay, user nao thay doi gi, user nao xoa cai gi ay
