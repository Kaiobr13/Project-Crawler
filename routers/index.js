const routerDEVLogs = require("./devicesRoutes");
const dbRoutes = require("./dbRoutes");

module.exports = (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/devlogs", routerDEVLogs);
  app.use("/DBlogs", dbRoutes);
};
