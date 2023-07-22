const mongoose = require("mongoose");

const MarqueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 6,
  },
  picture: {
    type: String,
    default: "sartex.jpg",
  },
  description: {
    type: String,
    maxlength: 300,
    required:false
  },
  role: {
    type: String,
    enum: ["Admin", "Marque"],
    default: "Marque",
  },
});

module.exports = mongoose.model("Marque", MarqueSchema);
