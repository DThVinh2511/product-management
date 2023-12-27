const express = require("express");
const multer  = require('multer');
const router = express.Router();
const uploadCloud = require("../../middlewares/admin/uploadcloud.middleware");
const upload = multer();
const controller = require("../../controllers/admin/myAccount.controller");
const validate = require("../../validates/admin/account.validate");
router.get('/', controller.index);
router.get('/edit', controller.edit);
router.patch(
  '/edit', 
  upload.single('avatar'),
  validate.editPatch,
  uploadCloud.uploadImage,
  controller.editPatch
);

module.exports = router;