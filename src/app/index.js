const Koa = require("koa");
require('../app/database')
const bodyParser = require('koa-bodyparser')

const userRouter = require('../router/user.router')
const app = new Koa();

app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

module.exports = app