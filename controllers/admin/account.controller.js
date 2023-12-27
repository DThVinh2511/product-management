const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");
const md5 = require('md5');

// [GET] /admin/accounts/index
module.exports.accounts = async (req, res) => {
  let find = {
    deleted: false
  }
  const records = await Account.find(find).select("-password -token");

  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false
    });
    record.role = role;
  }
  res.render("admin/pages/account/index", {
    pageTitle: "Danh sach tai khoan",
    records: records
  })
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false
  }
  const roles = await Role.find(find);
  res.render("admin/pages/account/create", {
    pageTitle: "Them moi tai khoan",
    roles: roles
  })
}

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  const emailExist = await Account.findOne({
    email: req.body.email,
    deleted: false
  });

  if (emailExist) {
    req.flash('error', `Email ${req.body.email} da ton tai!`);
    res.redirect("back");
  } else {
    req.body.password = md5(req.body.password);

    const record = new Account(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      _id: id,
      deleted: false
    }
    const records = await Account.findOne(find);
    const roles = await Role.find({
      deleted: false
    })
    res.render("admin/pages/account/edit", {
      pageTitle: "Chinh sua tai khoan",
      records: records,
      roles: roles
    })
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  const emailExist = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false
  });
  if (emailExist) {
    req.flash('error', `Email ${req.body.email} da ton tai!`);
    res.redirect("back");
  } else {
    try {
      await Account.updateOne({ _id: id }, req.body);
      req.flash('success', 'Cap nhat thanh cong!');
    } catch (error) {
      req.flash('error', 'Cap nhat that bai!');
    }
    res.redirect(`back`);
  }
}

