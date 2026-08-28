import mongoose from "mongoose"

const ScheduleSchema = new mongoose.Schema({
    
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  day: {
    type: String
  },
  slots: [
    {
      time: {
        type: String
      },
      isBooked: {
        type: Boolean,
        default: false
      }
    }
  ]

}, { timestamps: true })

export const Schedule = mongoose.model("Schedule", ScheduleSchema)