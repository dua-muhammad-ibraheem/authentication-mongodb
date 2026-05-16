const User = require('../models/User'); // Check karein aapke model ka path yahi ho
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 1. SIGNUP CONTROLLER
const signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check karein ke user pehle se exist to nahi karta
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Naya user create karein (password hashing aapne agar model mein nahi ki toh yahan hogi)
        const newUser = new User({
            username,
            email,
            password, // Agar model mein pre-save hook nahi hai toh bcrypt.hash use hota hai
            role: role || 'user' // Default role 'user' hoga agar admin nahi bhejenge
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });

    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ message: "Server error during signup" });
    }
};

// 2. LOGIN CONTROLLER
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // User ko email se dhoondein
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Password match karein
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // JWT Token generate karein
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'secretkey', // Aapki .env file se secret key lega
            { expiresIn: '1h' }
        );

        // Response mein token aur user ki details bhejrein
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: "Server error during login" });
    }
};

// 3. EXPORTS (Dono functions ko export karna zaroori hai)
module.exports = { 
    signup, 
    login 
};