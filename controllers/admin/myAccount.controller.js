const Account = require("../../models/account.model");
const md5 = require('md5');

// [GET] /admin/my-account
module.exports.index = (req, res) => {
  res.render("admin/pages/myAccount/index", {
    pageTitle: "Thông tin cá nhân"
  })
}
// [GET] /admin/my-account/edit
module.exports.edit = (req, res) => {
  res.render("admin/pages/myAccount/edit", {
    pageTitle: "Chỉnh sửa thông tin cá nhân"
  })
}
// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
  const id = res.locals.user.id;
  const emailExist = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false
  });
  if (emailExist) {
    req.flash('error', `Email ${req.body.email} đã tồn tại!`);
    res.redirect("back");
  } else {
    try {
      await Account.updateOne({ _id: id }, req.body);
      req.flash('success', 'Cập nhật thành công!');
    } catch (error) {
      req.flash('error', 'Cập nhật thất bại!');
    }
    res.redirect(`back`);
  }
}

