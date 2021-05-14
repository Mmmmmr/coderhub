const { getByName } = require("../service/user.service");
const jwt = require("jsonwebtoken");

const { PUBLIC_KEY } = require("../app/config");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_DOES_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION
} = require("../constants/error-types");
const { md5password } = require("../util/password-handle");

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    const error = new Error(NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }
  const result = await getByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  if (md5password(password) != user.password) {
    const error = new Error(PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = user;

  await next();
};

const verifyAuth = async (ctx, next) => {
  console.log("verifyAuth middleware");
  const authorization = ctx.headers.authorization;
  const token = authorization.replace("Bearer ", "");
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
};

module.exports = {
  verifyLogin,
  verifyAuth,
};
