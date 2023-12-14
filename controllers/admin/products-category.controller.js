const productsCategory = require("../../models/products-category.model");
const systemConfig = require("../../config/system");
const createTreeHelpers = require("../../helpers/createTree");

// [GET] /admin/product
module.exports.product = async (req, res) => {
  let find = {
    deleted: false
  };
  const records = await productsCategory.find(find);
  const newRecords = createTreeHelpers.tree(records);
  res.render("admin/pages/products-category/index", {
    pageTitle: "products-category",
    newRecords: newRecords
  });
}
// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false
  };
  const records = await productsCategory.find(find);
  const newRecords = createTreeHelpers.tree(records);
  res.render("admin/pages/products-category/create", {
    pageTitle: "Them moi danh muc san pham",
    newRecords: newRecords
  });
}
// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const countProducts = await productsCategory.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const record = new productsCategory(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}
// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await productsCategory.findOne({
      _id: id,
      deleted: false
    })
    const records = await productsCategory.find({
      deleted: false
    });
    const newRecords = createTreeHelpers.tree(records);
    res.render("admin/pages/products-category/edit", {
      pageTitle: "Chinh sua danh muc san pham",
      newRecords: newRecords,
      data: data
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
}
// [PATCH] /admin/products-category/edit
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position);
  try {
    await productsCategory.updateOne({ _id: id }, req.body);
    req.flash('success', 'Cap nhat thanh cong!');
  } catch (error) {
    req.flash('error', 'Cap nhat that bai!');
  }
  res.redirect(`back`);
}