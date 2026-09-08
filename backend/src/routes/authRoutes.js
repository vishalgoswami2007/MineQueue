import express from "express";

import {
  signup,
  login,
  GoogleOAuth,
  forgetPassword,
  verifyOtp,
  resetPassword,
} from "../controllers/Auth.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/GoogleOAuth", GoogleOAuth);

router.post("/forgetPassword", forgetPassword);

router.post("/verifyOtp", verifyOtp);

router.post("/resendVerificationOtp", resendVerificationOtp);

router.post("/resetPassword", resetPassword);

export default router;