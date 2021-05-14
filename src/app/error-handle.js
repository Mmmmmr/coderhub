const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXISTS,
  USER_DOES_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
} = require("../constants/error-types");

const errorHandle = (err, ctx) => {
  let status, message;
  switch (err.message) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或密码不能为空";
      break;
    case USER_ALREADY_EXISTS:
      status = 409;
      message = "用户已存在";
      break;
    case PASSWORD_IS_INCORRENT:
      status = 400;
      message = "密码错误";
      break;
    case USER_DOES_NOT_EXISTS:
      status = 400;
      message = "用户名不存在";
      break;
    case UNAUTHORIZATION:
      status = 401;
      message = "无效token";
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }
  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandle;
