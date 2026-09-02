import express from 'express';
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createSchedule } from "../controllers/Schedule.js";

const router = express.Router(); 

router.post('/create' , authMiddleware , createSchedule);

export default router;