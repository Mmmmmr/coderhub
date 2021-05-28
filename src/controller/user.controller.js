const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { AVATAR_PATH } = require("../constants/file-path");
const fs = require("fs");
class UserController {
  async create(ctx, next) {
    const user = ctx.request.body;
    const result = await userService.create(user);
    ctx.body = result;
  }

  async avatarInfo(ctx, next) {
    const { userId } = ctx.params;
    const avatarInfo = await fileService.getAvatarByUserId(userId);
    ctx.response.set("content-type", avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
  }
}

module.exports = new UserController();
