const productsCategory = require("../../models/products-category.model");
const createTreeHelpers = require("../../helpers/createTree");

module.exports.category = async (req, res, next) => {
  let find = {
    deleted: false
  };
  const productCategory = await productsCategory.find(find);
  const newProductsCategory = createTreeHelpers.tree(productCategory);

  res.locals.layoutProductsCategory = newProductsCategory;
  
  next();
}