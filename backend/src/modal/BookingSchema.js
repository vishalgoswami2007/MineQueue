import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    slot:{
        type:String
    },
    date:{
        type:Date
    },
    status:{
        type:String,
        enum:['confirmed' , 'pending' , 'cancelled'],
        default:'pending'
    },
    paymentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Payment'
    }
} , {timestamps:true})

export const Booking = mongoose.model('Booking' , BookingSchema);