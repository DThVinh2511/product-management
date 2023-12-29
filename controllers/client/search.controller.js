const searchHelper = require("../../helpers/search");
const Product = require("../../models/product.model");
const newPriceProductsHelper = require("../../helpers/newPriceProduct");
module.exports.searchKeyword = async (req, res) => {
  let find = {
    deleted: false,
  }
  const opjectSearch = searchHelper(req.query);

  if(opjectSearch.regex) {
    find.title = opjectSearch.regex
  }
  const products = await Product.find(find).sort({ position: "desc"});
  const newProducts = newPriceProductsHelper.newPriceProduct(products);
  res.render("client/page/search/index", {
    pageTitle: `Kết quả tìm kiếm của sản phẩm ${req.query.keyword}`,
    products: newProducts,
    keyword: req.query.keyword
  });
}