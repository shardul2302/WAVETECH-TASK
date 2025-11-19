const express = require("express");
const router = express.Router();

const userController = require('../controller/user.controller');
const {createUser,updateUser,deleteUser,getUsers,} = userController;

// Create User
router.post("/create", createUser);

// Update User Role
router.put("/update/:id", updateUser);

// Delete User
router.delete("/delete/:id", deleteUser);

// Read Users with Pagination
router.get("/list", getUsers);

module.exports = router;
