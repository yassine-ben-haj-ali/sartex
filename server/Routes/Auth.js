const router = require("express").Router();
const { Login, RegisterAdmin } = require("../Controllers/auth");

router.post("/login", Login);
router.post("/register", RegisterAdmin);

module.exports = router;
