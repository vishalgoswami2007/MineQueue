import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";

import {
  createSchedule,
  getDoctorSchedule,
  getMySchedule,
} from "../controllers/Schedule.js";

const router = express.Router();

// Doctor creates or updates their schedule
router.post("/create", authMiddleware, createSchedule);

// Logged-in doctor fetches their own schedule
router.get("/my", authMiddleware, getMySchedule);

// Patient fetches a doctor's schedule
router.get(
  "/doctor/:doctorId",
  authMiddleware,
  getDoctorSchedule
);

export default router;