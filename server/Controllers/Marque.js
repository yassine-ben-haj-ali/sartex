const Marque = require("../Models/Marque");
const bcrypt = require("bcrypt");
exports.getMarques = async (req, res) => {
  try {
    const marques = await Marque.find({ role: "Marque" });
    res.status(200).json(marques);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getMarque = async (req, res) => {
  const { id } = req.params;
  try {
    const marque = await Marque.findById(id);
    res.status(200).json(marque);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.createMarque = async (req, res) => {
  const { password, email, name, phone } = req.body;
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newMarque = new Marque({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    //save user and respond
    const marque = await newMarque.save();
    res.status(200).json(marque);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.editMarque = async (req, res) => {
  const updatedData = { ...req.body };
  const { id } = req.params;
  try {
    if (req.marque.id == req.params.id || req.marque.role == "Admin") {
      if (req.file) {
        updatedData.picture = req.file.filename;
      }
      const updatedMarque = await Marque.findByIdAndUpdate(
        id,
        {
          $set: updatedData,
        },
        { new: true }
      );
      res.status(200).json(updatedMarque);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteMarque = async (req, res) => {
  try {
    const { id } = req.params;
    const marque = await Marque.findById(id);
    if (!marque) {
      return res.status(404).json({ message: "Marque not found" });
    }
    await marque.remove();

    return res.json({ message: "Marque deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete the marque" });
  }
};
