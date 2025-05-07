const routerLogs = require("./logsRoutes");
const dbRoutes = require("./dbRoutes"); // <-- Faltava isso aqui!

module.exports = (app) => {
    app.use(routerLogs);
    app.use("/db", dbRoutes);
};
