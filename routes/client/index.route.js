const productRouter = require("./product.route");
const homeRouter = require("./home.route");
const searchRouter = require("./search.route");
const cartRouter = require("./cart.route");
const middlewareAuth = require("../../middlewares/client/category.middleware");
const middlewareCartId = require("../../middlewares/client/cart.middleware");
module.exports = (app) => {
  app.use(middlewareAuth.category);
  app.use(middlewareCartId.cartId);
  app.use('/', homeRouter);
  app.use("/products", productRouter);
  app.use("/search", searchRouter);
  app.use("/cart", cartRouter);
}