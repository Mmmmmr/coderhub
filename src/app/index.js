const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const errorHandle = require("./error-handle");
const { useRoutes } = require("../router");
require("../app/database");

const app = new Koa();
app.useRoutes = useRoutes;
app.use(bodyParser());
app.useRoutes();
app.on("error", errorHandle);

module.exports = app;
