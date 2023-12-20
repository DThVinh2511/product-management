const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

// [GET] /admin/roles
module.exports.role = async (req, res) => {
  let find = {
    deleted: false
  }
  const record = await Role.find(find);
  res.render("admin/pages/role/index", {
    pageTitle: "Role",
    record: record
  })
}
// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/role/create", {
    pageTitle: "Them moi nhom quyen",
  });
}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
  const record = new Role(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      _id: id,
      deleted: false
    };
    const record = await Role.findOne(find);
    res.render("admin/pages/role/edit", {
      pageTitle: "Chinh sua nhom quyen",
      record: record
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  try {
    await Role.updateOne({ _id: id }, req.body);
    req.flash('success', 'Cap nhat thanh cong!');
  } catch (error) {
    req.flash('error', 'Cap nhat that bai!');
  }
  res.redirect(`back`);
}

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false
  }
  const record = await Role.find(find);
  res.render("admin/pages/role/permissions", {
    pageTitle: "Danh sach phan quyen",
    record: record
  });
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  try {
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
      await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
    }
    req.flash('success', 'Cap nhat thanh cong!');
    res.redirect("back");
  } catch (error) {
    req.flash('error', 'Cap nhat that bai!');
    res.redirect("back");
  }
}