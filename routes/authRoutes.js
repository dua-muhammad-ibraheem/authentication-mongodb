const express = require('express');
const router = express.Router();
// Controller sahi se import ho raha hai? Check karein:
const { login, signup } = require('../controllers/authController'); 

// Line 5 aur baqi routes ko aise check karein:
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;