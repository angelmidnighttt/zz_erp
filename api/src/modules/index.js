import { Router } from "express";
import eventBus from "../shared/events/event-bus.js";
import auth from "./auth/index.js";

// Them module moi: import va them vao mang nay
const modules = [auth];

const route = Router();

for (const mod of modules) {
  route.use(mod.basePath, mod.router);
  for (const [eventName, handler] of Object.entries(mod.handlers)) {
    eventBus.on(eventName, handler);
  }
}

export default route;
