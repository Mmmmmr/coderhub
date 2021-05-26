const Router = require("koa-router");
const momentRouter = new Router({ prefix: "/moment" });

const { verifyLabelExists } = require("../middleware/label.middleware");
const {
  verifyAuth,
  verifyPermisson,
} = require("../middleware/auth.middleware");
const {
  create,
  detail,
  list,
  update,
  remove,
  addLabels,
} = require("../controller/moment.controller");

momentRouter.post("/", verifyAuth, create);
momentRouter.get("/:momentId", detail);
momentRouter.get("/", list);
momentRouter.patch("/:momentId", verifyAuth, verifyPermisson, update);
momentRouter.delete("/:momentId", verifyAuth, verifyPermisson, remove);
momentRouter.post("/:momentId/labels", verifyAuth, verifyPermisson, verifyLabelExists, addLabels);

module.exports = momentRouter;
