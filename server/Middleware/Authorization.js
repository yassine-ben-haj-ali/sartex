const jwt = require("jsonwebtoken");
exports.verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).json("Access Denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.marque = decoded;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.verifyAdmin = async (req, res, next) => {
  try {
    if (req.marque.role !== "Admin") {
      return res.status(403).json("Access Denied");
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
