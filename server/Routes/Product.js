const router = require("express").Router();
const { verifyToken } = require("../Middleware/Authorization");
const {
  createProduct,
  getProducts,
  getProductByMarque,
  editProduct,
  deleteProduct,
  getProduct
} = require("../Controllers/Product");
const { upload } = require("../Utils/uploadFile");
router.post("/", verifyToken, upload.single("file"), createProduct);
router.get("/", getProducts);
router.get("/marque", verifyToken, getProductByMarque);
router.get("/details/:productID", getProduct);
router.delete("/:id", verifyToken, deleteProduct);
router.put("/:id", verifyToken, upload.single("file"), editProduct);


module.exports=router;