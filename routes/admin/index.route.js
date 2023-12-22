const systemconfig = require("../../config/system");

const dashboardRouter = require("./dashboard.route");
const productRouter = require("./product.route");
const productCategoryRouter = require("./products-category.route");
const roleRouter = require("./role.route");
const accountRouter = require("./account.route");
const authRouter = require("./auth.route");
module.exports = (app) => {
  app.use(systemconfig.prefixAdmin + "/dashboard", dashboardRouter);
  app.use(systemconfig.prefixAdmin + "/products", productRouter);
  app.use(systemconfig.prefixAdmin + "/products-category", productCategoryRouter);
  app.use(systemconfig.prefixAdmin + "/roles", roleRouter);
  app.use(systemconfig.prefixAdmin + "/accounts", accountRouter)
  app.use(systemconfig.prefixAdmin + "/auth", authRouter)
}