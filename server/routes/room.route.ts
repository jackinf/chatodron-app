import express from 'express';

import roomController from '../controllers/room.controller';

const router = express.Router();

router.get('/search', roomController.search);
router.post('/create', roomController.create);
router.get('/:id', roomController.details);
router.put('/:id', roomController.update);
router.delete('/:id', roomController.remove);

export default router;
