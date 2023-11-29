const systemconfig = require("../../config/system");

const dashboardRouter = require("./dashboard.route");
const productRouter = require("./product.route");
const productCategoryRouter = require("./products-category.route");
module.exports = (app) => {
  app.use(systemconfig.prefixAdmin + "/dashboard", dashboardRouter);


  app.use(systemconfig.prefixAdmin + "/products", productRouter);
  app.use(systemconfig.prefixAdmin + "/products-category", productCategoryRouter);
}