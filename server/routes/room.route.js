const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room.controller');

router.get('/health', roomController.health);
router.post('/create', roomController.create);
router.get('/:id', roomController.details);
router.put('/:id', roomController.update);
router.delete('/:id', roomController.remove);

module.exports = router;
