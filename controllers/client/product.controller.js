const Product = require("../../models/product.model");
// [GET] /product
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false
  }).sort({position: "desc"});
  const newProducts = products.map(item => {
    item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(0);
    return item;
  })
  console.log(newProducts);
  res.render("client/page/products/index", {
    pageTitle: "Danh sach san pham",
    products: newProducts
  });
};

// [GET] /products/detail
module.exports.detail = async (req, res) => {
  try{
    let find = {
      slug: req.params.slug,
      deleted: false,
      status: "active"
    };
    const product = await Product.findOne(find);
    res.render("client/page/products/detail", {
      pageTitle: "Chi tiet san pham",
      products: product
    });
  } catch(error) {
    req.flash('error', 'loi he thong!');
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }
}