const express = require("express");
const multer  = require('multer');
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");
router.get('/', controller.product);
router.get('/create', controller.create);
router.post(
  '/create',
  upload.single('thumbnail'),
  validate.createPostTitle,
  controller.createPost
);
router.get('/edit/:id', controller.formEditItem);
router.patch(
  '/edit/:id',
  upload.single('thumbnail'),
  validate.createPostTitle,
  controller.editItem
);
router.get('/detail/:id', controller.detail);
router.patch('/change-status/:status/:id', controller.changeStatus);
router.patch('/change-multi', controller.changeMulti);
router.delete('/delete/:id', controller.deleteItem);
module.exports = router;