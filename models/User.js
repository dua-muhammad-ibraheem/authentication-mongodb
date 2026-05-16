const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Bcrypt import karein

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

// models/User.js ke andar is section ko aise update karein:

userSchema.pre('save', async function () {
    // Agar password modify nahi hua toh aage badhein
    if (!this.isModified('password')) return;

    try {
        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        throw new Error(err);
    }
});

module.exports = mongoose.model('User', userSchema);