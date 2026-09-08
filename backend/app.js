import "dotenv/config";
import express from "express";
import cors from "cors";

import AuthRoutes from "./src/routes/authRoutes.js";
import ScheduleRoutes from "./src/routes/ScheduleRoutes.js";
import BookingRoutes from "./src/routes/BookingRoutes.js";
import PaymentRoutes from "./src/routes/paymentRoutes.js";
import UploadRoutes from "./src/routes/uploadRoutes.js";
import DashboardRoutes from "./src/routes/DashboardRoutes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://minequeue-vishal-nine.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow tools like Postman / server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());

app.use("/api/auth", AuthRoutes);
app.use("/api/schedule", ScheduleRoutes);
app.use("/api/booking", BookingRoutes);
app.use("/api/payment", PaymentRoutes);
app.use("/api/upload", UploadRoutes);
app.use("/api/dashboard", DashboardRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "MineQueue API is running",
  });
});

export default app;