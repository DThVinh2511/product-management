const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const newPriceProductsHelper = require("../../helpers/newPriceProduct");
// [GET] /cart
module.exports.index = async (req, res) => {
  const cart = await Cart.findOne({
    _id: req.cookies.cartId
  });

  for (const product of cart.products) {
    const productInfo = await Product.findOne({
      _id: product.product_id
    });
    newPriceProductsHelper.newPriceProductItem(productInfo);
    product.sumPriceOfItem = product.quantity * productInfo.newPrice;
    product.productInfo = productInfo;
  }
  cart.sumPriceOfAllItem = cart.products.reduce((sum, item) => sum + item.sumPriceOfItem, 0);
  res.render("client/page/cart/index", {
    pageTitle: "Giỏ hàng",
    cartDetail: cart
  });
}
// [POST] /cart/add/:id
module.exports.addPost = async (req, res) => {
  try {
    const productId = req.params.id;
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({ _id: cartId });
    const productInCart = cart.products.find(item => item.product_id == productId);
    if (productInCart) {
      const newQuantity = quantity + productInCart.quantity;
      await Cart.updateOne({
        _id: cartId,
        "products.product_id": productId
      }, {
        $set: { "products.$.quantity": newQuantity }
      });
      req.flash('success', 'Thêm số lượng trong giỏ hàng thành công!');
    } else {
      await Cart.updateOne({
        _id: cartId
      }, {
        $push: {
          products: {
            product_id: productId,
            quantity: quantity
          }
        }
      });
      req.flash('success', 'Thêm vào giỏ hàng thành công!');
    }
    res.redirect("back");
  } catch (error) {
    req.flash('error', 'lỗi hệ thống!');
    res.send("Trang web đang gặp sự cố vui lòng thử lại sau!");
  }
}

// [GET] /cart/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const productId = req.params.id;
    const cartId = req.cookies.cartId;
    await Cart.updateOne({
      _id: cartId
    }, {
      $pull: { "products": { "product_id": productId } }
    });
    req.flash('success', 'Xóa thành công!');
    res.redirect("back");
  } catch (error) {
    req.flash('error', 'Lỗi hệ thống!');
  }
}

// [GET] /cart/quantity/:id/:value
module.exports.quantity = async (req, res) => {
  try {
    const productId = req.params.id;
    const value = parseInt(req.params.value);
    const cartId = req.cookies.cartId;
    await Cart.updateOne({
      _id: cartId,
      "products.product_id": productId
    }, {
      $set: { "products.$.quantity": value }
    });
    req.flash('success', 'Thay đổi số lượng thành công!');
    res.redirect("back");
  } catch (error) {
    req.flash('error', 'Lỗi hệ thống!');
  }
}