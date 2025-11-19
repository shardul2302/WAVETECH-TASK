const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  role: {
    type: String,
    enum: ["SUPERADMIN", "ADMIN", "UNITMANAGER", "USER"],
  },
  password: String,
  uniqueId: String, // A1, UM1, U1...
});

module.exports = mongoose.model("User", userSchema);
