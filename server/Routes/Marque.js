const router = require("express").Router();
const {
  getMarques,
  editMarque,
  deleteMarque,
  createMarque,
  getMarque,
} = require("../Controllers/Marque");
const { verifyAdmin, verifyToken } = require("../Middleware/Authorization");
const { upload } = require("../Utils/uploadFile");

router.post("/", verifyToken, verifyAdmin, createMarque);
router.get("/", verifyToken, verifyAdmin, getMarques);
router.get("/:id",verifyToken,getMarque);
router.put("/:id", verifyToken, upload.single("file"), editMarque);
router.delete("/:id", verifyToken, verifyAdmin, deleteMarque);

module.exports = router;
