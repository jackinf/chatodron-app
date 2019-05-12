const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message.controller');

router.get('/search', messageController.search);
router.post('/add', messageController.add);
router.get('/get-last-n', messageController.getLastN);

module.exports = router;
