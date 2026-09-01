import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import AuthRoutes from "./src/routes/authRoutes.js";
import dotenv from 'dotenv';


dotenv.config();

const app = express();

app.use(express.json())
app.use(cors())
app.use('/api/auth' , AuthRoutes);
app.get('/', (req, res) => {
   res.send('Server is working!');
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Mongoose Connect "))
.catch((error) => console.log("failed" , error))

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => {
    console.log(`Server Running At ${PORT}`);
})

