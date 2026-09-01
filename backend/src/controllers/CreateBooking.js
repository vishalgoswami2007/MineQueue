import {Schedule} from "../modal/ScheduleSchema.js"
import {Booking} from "../modal/BookingSchema.js"

const CreateBooking = async (req , res) => {
    try {
        
        const {doctorId , day , date , time} = req.body;
        const PatientId = req.user.userId;

        const doctorSchedule = await Schedule.findOne({doctorId , day})

        if (!doctorSchedule) {
            return res.status(404).json({message:"Schedule not found for this day"})
        }

        const slot = doctorSchedule.slots.find(s => s.time === time)

        if (!slot) {
            return res.status(404).json({message:"Slot not Found"})
        }

        if (slot.isBooked) {
            return res.status(400).json({ message: "Slot already booked" });
        }

        const newBooking = await Booking.create({
            doctorId,
            patientId: PatientId,
            date,
            slot: time
        })

            slot.isBooked = true;
            await doctorSchedule.save();

         return res.status(201).json({message:"Slot Booked Successfully", booking: newBooking})

    } catch (error) {
        return res.status(400).json({message:"Slot Book Failed" , error:error.message})
    }
}

export default CreateBooking;