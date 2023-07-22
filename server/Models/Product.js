const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default: "",
  },
  marqueID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Marque",
    required: true,
  },
  description: {
    type: String,
    maxlength: 300,
    required: false,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
