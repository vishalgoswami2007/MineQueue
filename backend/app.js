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
    origin: (origin, callback) => {
      // Allow requests with no browser origin (Postman/server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      // Exact trusted origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow MineQueue Vercel preview deployments
      const isMineQueueVercelPreview =
        /^https:\/\/minequeue-vishal-[a-zA-Z0-9-]+\.vercel\.app$/.test(origin);

      if (isMineQueueVercelPreview) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
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
  res.send("Server is working!");
});

export default app;