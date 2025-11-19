const User = require("../models/user.model");

// Generate simple unique ID
const generateId = async (role) => {
  const count = await User.countDocuments({ role });
  if (role === "ADMIN") return "A" + (count + 1);
  if (role === "UNITMANAGER") return "UM" + (count + 1);
  if (role === "USER") return "U" + (count + 1);
  return "SA" + (count + 1);
};

exports.createUser = async (req, res) => {
  try {
    const { creatorRole, username, email, role, password } = req.body;

    // Validation Rules
    if (creatorRole === "SUPERADMIN" && role !== "ADMIN") {
      return res.status(400).json({ message: "SuperAdmin can create only ADMIN users" });
    }

    if (creatorRole === "ADMIN" && role !== "UNITMANAGER") {
      return res.status(400).json({ message: "Admin can create only Unit Manager users" });
    }

    if (creatorRole === "UNITMANAGER" && role !== "USER") {
      return res.status(400).json({ message: "Unit Manager can create only Users" });
    }

    const uniqueId = await generateId(role);

    const user = await User.create({ username, email, role, password, uniqueId });

    res.json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------------------
// UPDATE USER ROLE
// ----------------------------
exports.updateUser = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------------------
// DELETE USER
// ----------------------------
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------------------
// READ USERS WITH PAGINATION
// ----------------------------
exports.getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const users = await User.find().skip(skip).limit(limit);

    res.json({ page, users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
