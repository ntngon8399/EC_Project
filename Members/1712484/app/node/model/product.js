const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  img: { type: String, required: true },
  category: { type: String, required: true },
  des: { type: String, required: true }
});

module.exports = mongoose.model("Product", productSchema, "product");

