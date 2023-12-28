const ProductCategory = require("../models/products-category.model");
module.exports.subCategory = async (parentId) => {
  const sub_Category = async (parentId) => {
    const subs = await ProductCategory.find({
      parent_id: parentId,
      deleted: false,
      status: "active"
    });

    let allSubs = [...subs];
    for (const sub of subs) {
      const children = await sub_Category(sub.id);
      allSubs = allSubs.concat(children);
    }
    return allSubs;
  }

  const result = await sub_Category(parentId);
  return result;
}