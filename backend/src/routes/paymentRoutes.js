import express from 'express';
import { CreateOrder , verifyPayment } from '../controllers/paymentController';
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/createOrder' , authMiddleware , CreateOrder);
router.post('/verifyPayment' , authMiddleware , verifyPayment);

export default router;