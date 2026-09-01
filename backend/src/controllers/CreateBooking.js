import {Schedule} from "../modal/ScheduleSchema.js"
import {Booking} from "../modal/BookingSchema.js"

const CreateBooking = async (req , res) => {
    try {
        
        const {doctorId , day , date , time} = req.body;
        const PatientId = req.user.userId;

        const updateSchedule = await Schedule.findOneAndUpdate(
            {doctorId , day , "slots.time": time , "slots.isBooked":false},
            {$set: {"slots.$.isBooked":true}} ,
            {new: true}
        )
         if (!updateSchedule) {
            return res.status(401).json({message:"Slot not Available or already Booked"})
         }

         const newBooking = await Booking.create({
            doctorId,
            patientId: PatientId,
            date,
            slot: time
        })

         return res.status(201).json({message:"Slot Booked Successfully", booking: newBooking})

    } catch (error) {
        return res.status(400).json({message:"Slot Book Failed" , error:error.message})
    }
}

export default CreateBooking;