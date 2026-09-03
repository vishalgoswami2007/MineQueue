import {User} from "../modal/UserSchema.js"
import {Booking} from "../modal/BookingSchema.js"

const getAllDoctor = async (req , res) => {
    try {
        
        const doctor = await User.find({role: "Doctor"}).select("-password -otp -otpExpiry")

        return res.status(200).json({message:"AllDoctor Fetch Successfully" , doctor})

    } catch (error) {
        return res.status(400).json({message:"GetAllDoctor Failed" , error:error.message})
    }
}
    
  const getAllBooking = async (req,res) => {
    try {

        const userId = req.user.userId;

        const bookings = await Booking.find({
           $or: [{doctorId: userId} , {patientId: userId}] 
        })

      return res.status(200).json({message:"Booking Fetch Successfully" , bookings})

    } catch (error) {
        return res.status(400).json({message:"Booking Fetch Failed" , error:error.message})
    }
  }

  const getMyProfile = async (req,res) => {
    try {
        
     const userId = req.user.userId;

     const user = await User.findById(userId).select("-password -otp -otpExpiry")

     return res.status(200).json({message:"Profile Fetch Successfully" , user})

    } catch (error) {
        return res.status(400).json({message:"Profile Fetch Failed" , error:error.message})
    }
  }

export {getAllDoctor , getAllBooking , getMyProfile};
