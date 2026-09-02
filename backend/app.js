import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoutes from "./src/routes/authRoutes.js";
import ScheduleRoutes from "./src/routes/scheduleRoutes.js";
import BookingRoutes from "./src/routes/bookingRoutes.js";
import PaymentRoutes from "./src/routes/paymentRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', AuthRoutes);
app.use('/api/schedule', ScheduleRoutes);
app.use('/api/booking', BookingRoutes);
app.use('/api/payment', PaymentRoutes);

app.get('/', (req, res) => {
   res.send('Server is working!');
});

export default app;