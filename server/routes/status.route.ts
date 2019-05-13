import express from 'express';

import statusController from '../controllers/status.controller';

const router = express.Router();
router.get('/health', statusController.health);

export default router;
