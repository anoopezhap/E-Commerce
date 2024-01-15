const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [1, "Price of product should be above 1"],
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: [0, "Stock can't be lower than zero"],
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
