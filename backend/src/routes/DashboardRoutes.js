import express from 'express';
import { getAllBooking , getMyProfile ,  getAllDoctor } from '../controllers/Dashboard';
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/Profile' , authMiddleware , getMyProfile);
router.get('/Booking' , authMiddleware , getAllBooking);
router.get('/Doctor' , authMiddleware , getAllDoctor);

export default router;