import express from 'express';

import messageController from '../controllers/message.controller';

const router = express.Router();

router.get('/search', messageController.search);
router.post('/add', messageController.add);
router.get('/get-last-n', messageController.getLastN);

export default router;
