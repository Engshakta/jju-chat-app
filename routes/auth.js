const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure User model exists
const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({ message: "User registered successfully", token });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
