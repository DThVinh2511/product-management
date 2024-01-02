const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/cart.controller");
router.get('/', controller.index);
router.post('/add/:id', controller.addPost);
router.get('/delete/:id', controller.delete);
router.get('/quantity/:id/:value', controller.quantity);

module.exports = router;