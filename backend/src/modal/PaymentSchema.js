import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    bookingId:{
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'Booking'
    },
    amount:{
        type:Number,
    },
    status:{
        type:String,
        enum:["success" , "failed" , "pending"],
        default:'pending'
    }
} , {timestamps: true})

export const Payment = mongoose.model("Payment" , PaymentSchema)
