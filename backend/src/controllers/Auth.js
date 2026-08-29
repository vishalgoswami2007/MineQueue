import bcrypt, { hash } from "bcrypt";
import {User} from "../modal/UserSchema.js";
import jwt from 'jsonwebtoken';


const signup = async (req,res) => {
    try {
        const {fullname , password , email , role } = req.body;

        const existingUser = await  User.findOne({email})

      if (existingUser) {
        return res.status(400).json({message: "User Already Exists"})
      }

        const Password = await bcrypt.hash(password, 10)
    
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        const newUser = await User.create({
            fullname,
            email,
            password: Password,
            role,
            otp,
            otpExpiry
        })
          return res.status(201).json({message:"User Created Successfully" , user: newUser})

    } catch (error) {
          return res.status(500).json({message:"Signup Failed" , error:error.message})
    }
}

const login = async (req,res) => {
    try {
        const {email , password} = req.body

        const UserExist = await User.findOne({email})

        if(!UserExist){
           return  res.status(400).json({message: "Invalid Credential"})
        }
             
       const passwordMatch = await bcrypt.compare(password , UserExist.password)
      

       if (!passwordMatch) {
         return res.status(400).json({message: "Invalid Credential"})
       }
   
      
        const token = jwt.sign(
             { userId: UserExist._id, role: UserExist.role },   
           process.env.JWT_SECRET,                   
             { expiresIn: '7d' }                      
                )
       
       return res.status(200).json({message:"Login Successfully" ,
         token: token ,
         user: { fullname: UserExist.fullname, email: UserExist.email, role: UserExist.role }})
    
    } catch (error) {
        return res.status(400).json({message:"User Login Failed" , error:error.message})
    }
}

    const verifyOtp = async (req, res) => {
        
   try {
    const {email,otp} = req.body;

    const user = await User.findOne({email})
      
    if (!user) {
        return res.status(404).json({message: "User Not Found"})
    }

    if (user.otp !== otp) {
        return res.status(400).json({message: "OTP Invalid"})
    }

    if (Date.now()>user.otpExpiry) {
        return res.status(400).json({message:"Otp Expire"})
    }

            user.isVerified = true;
            user.otp = undefined;
            user.otpExpiry = undefined;
            await user.save()
          
       return res.status(200).json({message:"OTP Verification Successfully"}) 

   } catch (error) {
      return res.status(500).json({ message: "OTP Verification Failed", error: error.message })
  }
} 

    const GoogleOAuth = async (req,res) => {
        try {
            const {email , name , googleId} = req.body;

            const user = await User.findOne({email})

            if (user) {

              const token = jwt.sign(
                { userId: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
            )
              return res.status(200).json({
                message: "Login Successful",
                token: token,
                user: { fullname: user.fullname, email: user.email, role: user.role }
            })  
              
            }else{

                const userCreate = await User.create({
                    fullname: name,
                    email,
                    googleId,
                    authProvider: "google"
                })
                const token = jwt.sign(
                        { userId: userCreate._id, role: userCreate.role },
                        process.env.JWT_SECRET,
                        { expiresIn: '7d' }
              )

                 return res.status(201).json({
                        message: "Account Created Successfully",
                        token: token,
                        user: { fullname: userCreate.fullname, email: userCreate.email, role: userCreate.role }
   })
            }

        } catch (error) {
            return res.status(400).json({
                message:"Google Oauth Failed",
                error: error.message
            })
        }
    }


export {signup , login , verifyOtp , GoogleOAuth} 