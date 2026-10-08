import router from "./auth.route.js";

// Public API cua module: module khac chi import tu day hoac tu auth.events.js
export default {
  basePath: "/auth",
  router,
  // Event cua module khac ma module nay lang nghe: { [eventName]: handler }
  handlers: {},
};
