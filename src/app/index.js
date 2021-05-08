const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const errorHandle = require("./error-handle");
const userRouter = require("../router/user.router");
require("../app/database");

const app = new Koa();

app.use(bodyParser());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.on("error", errorHandle);

module.exports = app;
