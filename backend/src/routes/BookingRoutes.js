import express from 'express';
import CreateBooking from '../controllers/CreateBooking.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, CreateBooking);

export default router;