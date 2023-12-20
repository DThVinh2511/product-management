const express = require("express");
const multer  = require('multer');
const router = express.Router();
const uploadCloud = require("../../middlewares/admin/uploadcloud.middleware");
const upload = multer();
const validate = require("../../validates/admin/account.validate");
const controller = require("../../controllers/admin/account.controller");
router.get('/', controller.accounts);
router.get(
  '/create',
  controller.create
);
router.post(
  '/create',
  upload.single('avatar'),
  validate.createPost,
  uploadCloud.uploadImage,
  controller.createPost
);
router.get(
  '/edit/:id',
  controller.edit
);
router.patch(
  '/edit/:id',
  upload.single('avatar'),
  validate.editPatch,
  uploadCloud.uploadImage,
  controller.editPatch
)
module.exports = router;