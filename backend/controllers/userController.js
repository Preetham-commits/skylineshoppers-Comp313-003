import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js'

// Get all users
export const getUser = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user" });
    }
};

// Create a user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validate input
    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Please provide all required fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password, // Password will be hashed by the pre-save middleware
    })

    if (user) {
      // Generate token
      const token = generateToken(user._id)

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  } catch (error) {
    console.error('Create user error:', error)
    res.status(error.status || 500).json({
      message: error.message || 'Error creating user',
    })
  }
}

// Update a user
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Error updating user" });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
};

// User Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Add validation
    if (!email || !password) {
      res.status(400)
      throw new Error('Please provide email and password')
    }

    // Find user by email
    const user = await User.findOne({ email })
    
    // Debug log
    console.log('Login attempt:', { email, userFound: !!user })

    if (!user) {
      res.status(401)
      throw new Error('Invalid email or password')
    }

    // Check password
    const isMatch = await user.matchPassword(password)
    
    // Debug log
    console.log('Password match:', isMatch)

    if (isMatch) {
      // Generate token
      const token = generateToken(user._id)
      
      // Send response
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
      })
    } else {
      res.status(401)
      throw new Error('Invalid email or password')
    }
  } catch (error) {
    console.error('Login error:', error)
    res.status(error.status || 500).json({
      message: error.message || 'Internal server error',
    })
  }
}
