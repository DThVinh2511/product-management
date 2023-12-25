const systemconfig = require("../../config/system");
const middlewareAuth = require("../../middlewares/admin/auth.middleware");
const dashboardRouter = require("./dashboard.route");
const productRouter = require("./product.route");
const productCategoryRouter = require("./products-category.route");
const roleRouter = require("./role.route");
const accountRouter = require("./account.route");
const authRouter = require("./auth.route");
module.exports = (app) => {
  app.use(systemconfig.prefixAdmin + "/dashboard", middlewareAuth.requiredAuth, dashboardRouter);
  app.use(systemconfig.prefixAdmin + "/products", middlewareAuth.requiredAuth, productRouter);
  app.use(systemconfig.prefixAdmin + "/products-category", middlewareAuth.requiredAuth, productCategoryRouter);
  app.use(systemconfig.prefixAdmin + "/roles", middlewareAuth.requiredAuth, roleRouter);
  app.use(systemconfig.prefixAdmin + "/accounts", middlewareAuth.requiredAuth, accountRouter)
  app.use(systemconfig.prefixAdmin + "/auth", authRouter)
}