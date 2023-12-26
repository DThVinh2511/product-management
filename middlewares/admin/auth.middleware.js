const systemConfig = require("../../config/system");
const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
module.exports.requiredAuth = async (req, res, next) => {
  if(!req.cookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  } else {
    const user = await Account.findOne({
      token: req.cookies.token,
      deleted: false,
      status: "active"
    }).select("-password -token -phone");
    const role = await Role.findOne({
      _id: user.role_id,
      deleted: false
    }).select("title permissions");
    if(!user) {
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
      res.locals.user = user;
      res.locals.role = role;
      next();
    }
  }
}