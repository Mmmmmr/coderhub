class AuthController {
  async login(ctx, next) {
    const { name, password } = ctx.request.body;
    ctx.body = `登录成功`;
  }
}

module.exports = new AuthController();
