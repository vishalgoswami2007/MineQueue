import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import AuthRoutes from "./src/routes/authRoutes.js";
import ScheduleRoutes from "./src/routes/scheduleRoutes.js";
import BookingRoutes from "./src/routes/bookingRoutes.js";
import PaymentRoutes from "./src/routes/paymentRoutes.js";
import UploadRoutes from "./src/routes/uploadRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', AuthRoutes);
app.use('/api/schedule', ScheduleRoutes);
app.use('/api/booking', BookingRoutes);
app.use('/api/payment', PaymentRoutes);
app.use('/api/upload', UploadRoutes);

app.get('/', (req, res) => {
   res.send('Server is working!');
});

export default app;