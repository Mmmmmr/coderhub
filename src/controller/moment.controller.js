const momentService = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    const result = await momentService.create(userId, content);
    console.log(result);
    ctx.body = result;
  }

  async detail(ctx, next) {
    const momentId = ctx.params.momentId;
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query;
    const result = await momentService.getMomentList(offset, size);
    ctx.body = result;
  }

  async update(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await momentService.update(content, momentId);
    ctx.body = result;
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.remove(momentId);
    ctx.body = result;
  }

  async addLabels(ctx, next) {
    const { labels } = ctx;
    const { momentId } = ctx.params;

    for (let label of labels) {
      const isExist = await momentService.hasLabel(momentId, label.id);
      if (!isExist) {
        await momentService.addLabel(momentId, label.id);
      }
    }
    // const result = await momentService.remove(momentId);
    ctx.body = "标签添加成功";
  }
}

module.exports = new MomentController();
