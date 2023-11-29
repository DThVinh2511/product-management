const productsCategory = require("../../models/products-category.model");
const systemConfig = require("../../config/system");

// [GET] /admin/product
module.exports.product = async (req, res) => {
  let find = {
    deleted: false
  };
  const records = await productsCategory.find(find);
  res.render("admin/pages/products-category/index", {
    pageTitle: "products-category",
    records: records
  });
}
// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  
  res.render("admin/pages/products-category/create", {
    pageTitle: "Them moi danh muc san pham",
  });
}
// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  if(req.body.position == "") {
    const countProducts = await productsCategory.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  console.log(req.body);
  const record = new productsCategory(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}