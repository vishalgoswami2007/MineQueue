import razorpayInstance from "../config/Razorpay.js";
import crypto from "crypto";

const  CreateOrder = async (req , res ) => {
 try {
    
    const option = {
        amount: 300*100 ,
        currency:INR ,
        receipt: "receipt_" + Date.now()
    } 
      
    const order = await razorpayInstance.orders.create(option)

   return res.status(201).json({message:"Order Created" , order})

 } catch (error) {
    return res.status(401).json({message:"Order Failed" ,  error:error.message})
 }
}

const verifyPayment = async (req , res) => {
  try {
     const {razorpay_order_id , razorpay_payment_id , razorpay_signature} = req.body

     const generated_signature = crypto
       .createHmac('sha256' , process.env.RAZORPAY_KEY_SECRET)
       .update(razorpay_order_id + "|"  + razorpay_payment_id)
       .digest('hex')

    if (generated_signature !== razorpay_signature) {
        return res.status(400).json({message:"Payment Verification Failed"})
    }

    const newPayment = await Payment.create({
         bookingId,
         amount: 300,
         status: "success"
      });

      await Booking.findByIdAndUpdate(bookingId, { status: "confirmed", paymentId: newPayment._id });

     return res.status(200).json({ message: "Payment verified successfully" , payment: newPayment });

  } catch (error) {
    return res.status(500).json({ message: "Verification failed", error: error.message });
  }
}

export {CreateOrder , verifyPayment};