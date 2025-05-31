

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Get last 50 messages
router.get('/', messageController.getMessages);

module.exports = router;