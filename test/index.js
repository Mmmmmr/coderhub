const Koa = require("koa");
const Router = require("koa-router");
const Session = require("koa-session");
const jwt = require("jsonwebtoken");
const app = new Koa();

const testRouter = new Router();

const SERCET_KEY = "abcdefg123";
testRouter.get("/test", (ctx, next) => {
  const user = { name: "jianglimin", id: 110 };
  const token = jwt.sign(user, SERCET_KEY, {
    expiresIn: 10 * 1000,
  });
  ctx.body = token;
});

testRouter.get("/demo", (ctx, next) => {
  const authorization = ctx.headers.authorization;
  const token = authorization.replace("Bearer ", "");

  try {
    const result = jwt.verify(token, SERCET_KEY);
    ctx.body = result;
  } catch (err) {
    console.log(err);
  }
});

app.use(testRouter.routes());
app.use(testRouter.allowedMethods());

app.listen(8080, () => {
  console.log("服务器启动成功");
});
