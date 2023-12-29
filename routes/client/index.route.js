const productRouter = require("./product.route");
const homeRouter = require("./home.route");
const searchRouter = require("./search.route");
const middlewareAuth = require("../../middlewares/client/category.middleware");
module.exports = (app) => {
  app.use(middlewareAuth.category);
  app.use('/', homeRouter);
  app.use("/products", productRouter);
  app.use("/search", searchRouter);
  // app.get('/products', (req, res) => {
  //   res.render("client/page/products/index");
  // })
}