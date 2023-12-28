const Product = require("../../models/product.model");
const ProductCategory = require("../../models/products-category.model");
const newPriceProductsHelper = require("../../helpers/newPriceProduct");
const ProductsCategory = require("../../helpers/products-category");
const systemConfig = require("../../config/system");
// [GET] /product
module.exports.index = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
      deleted: false
    }).sort({position: "desc"});
    const newProducts = newPriceProductsHelper.newPriceProduct(products)
    res.render("client/page/products/index", {
      pageTitle: "Danh sách sản phẩm",
      products: newProducts
    });
  } catch (error) {
    req.flash('error', 'lỗi hệ thống!');
    res.send("Trang web đang gặp sự cố vui lòng thử lại sau!");
  }
  
};

// [GET] /products/detail
module.exports.productDetail = async (req, res) => {
  try{
    let find = {
      slug: req.params.slug,
      deleted: false,
      status: "active"
    };
    const product = await Product.findOne(find);
    if(product.product_category_id) {
      const category = await ProductCategory.findOne({
        _id: product.product_category_id,
        deleted: false,
        status: "active"
      });
      product.category = category;
    }
    newPriceProductsHelper.newPriceProductItem(product);

    res.render("client/page/products/detail", {
      pageTitle: "chi tiết sản phẩm",
      product: product
    });
  } catch(error) {
    req.flash('error', 'lỗi hệ thống!');
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }
}
// [GET] /products/:slugCategory
module.exports.productsListOfCategory = async (req, res) => {
  try {
    const category = await ProductCategory.findOne({
      slug: req.params.slugCategory,
      deleted: false,
      status: "active"
    });
    const listCategory = await ProductsCategory.subCategory(category.id);
    const listCategoryId = listCategory.map(item => item.id);
    const products = await Product.find({
      product_category_id: { $in: [category.id, ...listCategoryId]},
      deleted: false,
      status: "active"
    }).sort({ position: "desc" });
    const newProducts = newPriceProductsHelper.newPriceProduct(products);
    res.render("client/page/products/index", {
      pageTitle: category.title,
      products: newProducts
    });
  } catch (error) {
    req.flash('error', 'lỗi hệ thống!');
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }
}