import mongoose from "mongoose";

const connectDB = async  () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
       console.log("MongoDB Connect Successfully")
    } catch (error) {
        console.log("MongoDB Failed" ,error)
    }
}

export default connectDB;