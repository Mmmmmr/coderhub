const Router = require("koa-router");
const momentRouter = new Router({ prefix: "/moment" });

const { verifyAuth, verifyPermisson } = require("../middleware/auth.middleware");
const { create, detail, list, update, remove} = require("../controller/moment.controller");

momentRouter.post("/", verifyAuth, create);
momentRouter.get("/:momentId", detail);
momentRouter.get("/", list);
momentRouter.patch('/:momentId', verifyAuth, verifyPermisson, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermisson, remove)
module.exports = momentRouter;
