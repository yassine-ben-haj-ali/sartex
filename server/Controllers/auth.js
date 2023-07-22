const Marque = require("../Models/Marque");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const marque = await Marque.findOne({ email });
    if (!marque) {
      return res.status(404).json("marque not found");
    }
    const validPassword = await bcrypt.compare(password, marque.password);
    if (!validPassword) {
      return res.status(400).json("wrong password");
    }
    const token = jwt.sign(
      { name: marque.name, id: marque._id, role: marque.role },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );
    res.status(200).json({ marque, token });
  } catch (err) {
    res.status(500).json(err.message);
  }
};


exports.RegisterAdmin = async (req, res) => {
  const { password, email, name, phone } = req.body;
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newAdmin = new Marque({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "Admin",
    });
    //save user and respond
    const admin = await newAdmin.save();

    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err.message);
  }
};
