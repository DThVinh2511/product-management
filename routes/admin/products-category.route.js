const express = require("express");
const multer  = require('multer');

// const storageMulter = require("../../helpers/storageMulter");
const uploadCloud = require("../../middlewares/admin/uploadcloud.middleware");
const upload = multer();
const validate = require("../../validates/admin/products-category.validate");
const router = express.Router();
const controller = require("../../controllers/admin/products-category.controller");

router.get('/', controller.product);
router.get('/create', controller.create);
router.post(
  '/create',
  upload.single('thumbnail'),
  uploadCloud.uploadImage,
  validate.createPostTitle,
  controller.createPost
);

module.exports = router;