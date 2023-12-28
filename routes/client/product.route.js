const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/product.controller");
router.get('/', controller.index);
router.get('/:slugCategory', controller.productsListOfCategory);
router.get('/detail/:slug', controller.productDetail);

// router.get('/edit', (req, res) => {
//   res.render("client/page/products/index");
// });

module.exports = router;