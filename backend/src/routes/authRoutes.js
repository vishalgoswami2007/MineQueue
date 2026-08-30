import express from 'express';
import {signup , login , GoogleOAuth , forgetPassword , verifyOtp} from "../controllers/Auth.js"

const router = express.Router();

router.post('/signup' , signup);
router.post('/login' , login);
router.post('/GoogleOAuth' , GoogleOAuth);
router.post('/forgetPassword' , forgetPassword);
router.post('/verifyOtp' , verifyOtp);

export default router;