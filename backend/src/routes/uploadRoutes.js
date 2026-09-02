import express from 'express';
import { uploadDocument } from '../controllers/uploadController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/document', authMiddleware, upload.single('document'), uploadDocument);

export default router;