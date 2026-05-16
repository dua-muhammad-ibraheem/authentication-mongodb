const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

// Yeh line sabse top par hona zaroori hai taake .env read ho sake
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Body parser taake frontend ka data backend read kar sake

// Routes Setup
app.use('/api/auth', authRoutes);

// MongoDB Atlas Connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("❌ Error: MONGO_URI is missing in your .env file!");
} else {
    mongoose.connect(mongoURI)
        .then(() => console.log("🔥 MongoDB Atlas Connected Successfully!"))
        .catch((err) => console.error("❌ MongoDB Connection Error:", err));
}

// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running smoothly on port ${PORT}`);
});