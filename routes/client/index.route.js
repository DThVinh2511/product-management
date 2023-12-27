const productRouter = require("./product.route");
const homeRouter = require("./home.route");
const middlewareAuth = require("../../middlewares/client/category.middleware");
module.exports = (app) => {
  app.use(middlewareAuth.category);
  app.use('/', homeRouter);
  app.use("/products", productRouter);
  // app.get('/products', (req, res) => {
  //   res.render("client/page/products/index");
  // })
}