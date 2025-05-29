const routerDEVLogs = require("./devicesRoutes");
const dbRoutes = require("./dbRoutes");
const routerActivity = require("./activityRoutes");
const sensorActivity = require("./sensorRoutes")

module.exports = (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/devices", routerDEVLogs);
  app.use("/DBlogs", dbRoutes);
  app.use("/activity", routerActivity);
  app.use("/sensors", sensorActivity);
};
