const routerLogs = require("./logsRoutes");
module.exports = (app) => {
    app.use(routerLogs);
};
