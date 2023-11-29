const mongoose = require("mongoose");
slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productsCategorySchema = new mongoose.Schema({
  title: String,
  parent_id: {
    type: String,
    default: ""
  },
  description: String,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  slug: { 
    type: String, 
    slug: "title",
    unique: true 
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date,
}, {
  timestamps: true
})

const ProductsCategory = mongoose.model('ProductsCategory', productsCategorySchema, "products-category");

module.exports = ProductsCategory;