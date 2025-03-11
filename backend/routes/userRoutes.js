import express from 'express'; // Change require to import
import { getUser, getUserById, createUser, updateUser, deleteUser, login } from '../controllers/userController.js'; // Use import for controllers

const router = express.Router();

router.get("/", getUser); 
router.get("/:id", getUserById); 
router.post("/signup", createUser);
router.post("/login", login); 
router.put("/:id", updateUser); 
router.delete("/:id", deleteUser);


export default router; 