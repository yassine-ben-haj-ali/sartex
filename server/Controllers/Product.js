const Product = require("../Models/Product");

exports.createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    //create new user
    const newProduct = new Product({
      name,
      price,
      picture: req.file.filename,
      marqueID: req.marque.id,
      description,
    });

    //save user and respond
    const product = await newProduct.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
exports.getProduct = async (req, res) => {
  const { productID } = req.params;
  try {
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).json("product not found");
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
exports.getProductByMarque = async (req, res) => {
  try {
    if (req.marque.role === "Admin") {
      const products = await Product.find();
      return res.status(200).json(products);
    } else {
      const products = await Product.find({ marqueID: req.marque.id });
      return res.status(200).json(products);
    }
  } catch (err) {
    res.status(501).json(err.message);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    if (product.marqueID == req.marque.id || req.marque.role == "Admin") {
      await product.remove();
    }

    return res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete the marque" });
  }
};

exports.editProduct = async (req, res) => {
  const updatedData = { ...req.body };
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json("Product not found");
    }
    if (req.marque.id == product.marqueID || req.marque.role == "Admin") {
      if (req.file) {
        updatedData.picture = req.file.filename;
      }
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          $set: updatedData,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
