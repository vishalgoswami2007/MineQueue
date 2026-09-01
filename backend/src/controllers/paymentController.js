import razorpayInstance from "../config/Razorpay.js";
import RazorpayInstance from "../config/Razorpay.js";

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

export {CreateOrder};