const Product = require("../../models/product.model");
const newPriceProductsHelper = require("../../helpers/newPriceProduct");
// [GET] /
module.exports.index = async (req, res) => {
  // lấy ra sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active"
  }).limit(6);
  const newProductsFeatured = newPriceProductsHelper.newPriceProduct(productsFeatured);
  // end 

  // lấy ra sản phẩm mới
  const productsNew = await Product.find({
    deleted: false,
    status: "active"
  }).sort({ position: "desc" }).limit(6);
  const newProductsNew = newPriceProductsHelper.newPriceProduct(productsNew);
  res.render("client/page/home/index", {
    pageTitle: "Trang chủ",
    productsFeatured: newProductsFeatured,
    productsNew: newProductsNew
  });
};