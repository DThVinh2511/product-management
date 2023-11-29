const Product = require("../../models/product.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
// [GET] /admin/product
module.exports.product = async (req, res) => {
  let filterStatus = filterStatusHelper(req.query);
  
  let find = {
    deleted: false
  }
  
  if(req.query.status) {
    find.status = req.query.status
  }
  const opjectSearch = searchHelper(req.query);

  if(opjectSearch.regex) {
    find.title = opjectSearch.regex
  }
  //pagination
  const countProducts = await Product.countDocuments(find);
  let opjectPagination = paginationHelper(
    {
      currentPage: 1,
      limitItem: 4
    },
    req.query,
    countProducts
  )
  //end pagination

  // sort
  let sort = {};
  if(req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  }
  else {
    sort.position = "desc";
  }
  // end sort
  const products = await Product.find(find)
    .sort(sort)
    .limit(opjectPagination.limitItem)
    .skip(opjectPagination.skip);
  res.render("admin/pages/products/index", {
    pageTitle: "products",
    products: products,
    filterStatus: filterStatus,
    keyword: opjectSearch.keyword,
    pagination: opjectPagination
  });
}
// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({_id: id}, {status: status});
  req.flash('success', 'Ban da cap nhat thanh cong!');
  res.redirect("back");
}
// [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
  // console.log(req.body);
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({_id: { $in: ids } }, {status: "active"});
      req.flash('success', `Ban da cap nhat thanh cong ${ids.length} san pham`);
      break;
    case "inactive":
      await Product.updateMany({_id: { $in: ids } }, {status: "inactive"});
      req.flash('success', `Ban da cap nhat thanh cong ${ids.length} san pham`);
      break;
    case "delete-all":
      await Product.updateMany({_id: { $in: ids }}, {
        deleted: true,
        deletedAt: new Date(),
      });
      req.flash('success', `Ban da xoa thanh cong ${ids.length} san pham`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({_id: id}, { position: position});
      };
      req.flash('success', `Ban da doi vi tri thanh cong ${ids.length} san pham`);
      break;
    default:
      break;
  }
  res.redirect("back");
}
// [DELETE] /admin/product/delete-item
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({_id: id}, { 
    deleted: true,
    deletedAt: new Date()
  });
  req.flash('success', `Ban da xoa thanh cong`);
  res.redirect("back");
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  
  res.render("admin/pages/products/create", {
    pageTitle: "Them moi san pham",
  });
}
// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if(req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const product = new Product(req.body);
  await product.save();
  res.redirect(`${systemConfig.prefixAdmin}/products`);
}

// [GET] /admin/products/edit
module.exports.formEditItem = async (req, res) => {
  try{
    let find = {
      _id: req.params.id,
      deleted: false
    };
    const product = await Product.findOne(find);
    res.render("admin/pages/products/edit", {
      pageTitle: "chinh sua san pham",
      products: product
    });
  } catch(error) {
    req.flash('error', 'loi he thong!');
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }
}
// [PATCH] /admin/products/edit
module.exports.editItem = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
  try {
    await Product.updateOne({ _id: id }, req.body);
    req.flash('success', 'Cap nhat thanh cong!');
  } catch (error) {
    req.flash('error', 'Cap nhat that bai!');
  }
  res.redirect(`back`);
}
// [GET] /admin/products/detail
module.exports.detail = async (req, res) => {
  try{
    let find = {
      _id: req.params.id,
      deleted: false
    };
    const product = await Product.findOne(find);
    console.log(product);
    res.render("admin/pages/products/detail", {
      pageTitle: product.title,
      products: product
    });
  } catch(error) {
    req.flash('error', 'loi he thong!');
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }
}