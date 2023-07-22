const {
  createOrder,
  getOrder,
  getOrders,
  confirmOrder,
  rejectOrder,
} = require("../Controllers/Order");
const { verifyToken, verifyAdmin } = require("../Middleware/Authorization");

const router = require("express").Router();

router.post("/", createOrder);
router.get("/:orderId", verifyToken, verifyAdmin, getOrder);
router.get("/", verifyToken, verifyAdmin, getOrders);
router.put("/:orderId/confirm", verifyToken, verifyAdmin, confirmOrder);
router.put("/:orderId/reject", verifyToken, verifyAdmin, rejectOrder);

module.exports = router;
