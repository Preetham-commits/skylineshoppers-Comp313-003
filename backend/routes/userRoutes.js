const express = require("express");
const { getUser, getUserById, createUser, updateUser, deleteUser, login } = require("../controllers/userController");

const router = express.Router();

router.get("/", getUser); 
router.get("/:id", getUserById); 
router.post("/signup", createUser);
router.post("/login", login); 
router.put("/:id", updateUser); 
router.delete("/:id", deleteUser);


module.exports = router;