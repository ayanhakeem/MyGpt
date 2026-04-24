import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, username: newUser.username },
            process.env.JWT_SECRET || "fallback_secret",
            { expiresIn: "7d" }
        );

        res.status(201).json({ token, username: newUser.username });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.error(err);
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET || "fallback_secret",
            { expiresIn: "7d" }
        );

        res.status(200).json({ token, username: user.username });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Update User Profile
router.post("/update", authMiddleware, async (req, res) => {
    try {
        const { username, newPassword } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (username) user.username = username;
        if (newPassword) {
            user.password = await bcrypt.hash(newPassword, 12);
        }

        await user.save();

        res.status(200).json({ 
            message: "Profile updated successfully", 
            username: user.username 
        });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

export default router;
