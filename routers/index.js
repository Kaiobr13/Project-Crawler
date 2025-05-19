const routerLogs = require("./devicesRoutes");
const dbRoutes = require("./dbRoutes");

module.exports = (app) => {
  app.use("/log", routerLogs);
  app.use("/db", dbRoutes);
};
