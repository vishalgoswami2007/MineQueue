import Razorpay from "razorpay";

const razorpayInstance = new Razorpay({
    key_id: Process.env.RAZORPAY_KEY_ID,
    key_secret:Process.env.RAZORPAY_KEY_SECRET
})

export default razorpayInstance;