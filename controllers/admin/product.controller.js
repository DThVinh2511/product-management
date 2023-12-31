const Product = require("../../models/product.model");
const productsCategory = require("../../models/products-category.model");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const createTreeHelpers = require("../../helpers/createTree");
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

  for (const product of products) {
    if(product.createdBy.account_id) {
      const user = await Account.findOne({_id: product.createdBy.account_id});
      if(user) {
        product.createdBy.fullName = user.fullName;
      }
    }
    const updateBy = product.updatedBy[product.updatedBy.length - 1];
    if(updateBy) {
      const user = await Account.findOne({_id: updateBy.account_id });
      if(user) {
        updateBy.accountFullName = user.fullName;
      }
    }
  };
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
  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date(),
  }
  switch (type) {
    case "active":
      await Product.updateMany({_id: { $in: ids } }, {
        status: "active",
        $push: { updatedBy: updatedBy }
      });
      req.flash('success', `Ban da cap nhat thanh cong ${ids.length} san pham`);
      break;
    case "inactive":
      await Product.updateMany({_id: { $in: ids } }, {
        status: "inactive",
        $push: { updatedBy: updatedBy }
      });
      req.flash('success', `Ban da cap nhat thanh cong ${ids.length} san pham`);
      break;
    case "delete-all":
      await Product.updateMany({_id: { $in: ids }}, {
        deleted: true,
        // deletedAt: new Date(),
        deletedBy: {
          account_id: res.locals.user.id,
          deletedAt: new Date()
        },
        $push: { updatedBy: updatedBy }
      });
      req.flash('success', `Ban da xoa thanh cong ${ids.length} san pham`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({_id: id}, { 
          position: position,
          $push: { updatedBy: updatedBy }
        });
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
    // deletedAt: new Date()
    deletedBy: {
      account_id: res.locals.user.id,
      deletedAt: new Date()
    }
  });
  req.flash('success', `Ban da xoa thanh cong`);
  res.redirect("back");
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  const records = await productsCategory.find({
    deleted: false
  });
  const newRecords = createTreeHelpers.tree(records);
  res.render("admin/pages/products/create", {
    pageTitle: "Them moi san pham",
    newRecords: newRecords
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

  req.body.createdBy = {
    account_id: res.locals.user.id
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
    const records = await productsCategory.find({
      deleted: false
    });
    const newRecords = createTreeHelpers.tree(records);
    res.render("admin/pages/products/edit", {
      pageTitle: "chinh sua san pham",
      products: product,
      newRecords: newRecords
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
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date(),
    };
    await Product.updateOne({ _id: id }, {
      ...req.body,
      $push: { updatedBy: updatedBy }
    });
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