import bcrypt, { hash } from "bcrypt";
import {User} from "../modal/UserSchema.js";
import jwt from 'jsonwebtoken';
import { OAuth2Client } from "google-auth-library";

const signup = async (req,res) => {
    try {

        console.log("SIGNUP REQUEST RECEIVED:", req.body); 

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
        console.log("SIGNUP ERROR:", error); 
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

    

           const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

                const GoogleOAuth = async (req, res) => {
          try {
                    const { credential, role = "Patient" } = req.body;

                    if (!credential) {
                    return res.status(400).json({
                        message: "Google credential is required",
                    });
                    }

                    if (!["Patient", "Doctor"].includes(role)) {
                    return res.status(400).json({
                        message: "Invalid account role",
                    });
                    }

                    const ticket = await googleClient.verifyIdToken({
                    idToken: credential,
                    audience: process.env.GOOGLE_CLIENT_ID,
                    });

                    const payload = ticket.getPayload();

                    if (!payload?.sub || !payload?.email || !payload.email_verified) {
                    return res.status(401).json({
                        message: "Google account verification failed",
                    });
                    }

                    const googleId = payload.sub;
                    const email = payload.email.toLowerCase().trim();
                    const fullname = payload.name || email.split("@")[0];

                    let user = await User.findOne({ googleId });

                    if (!user) {
                    user = await User.findOne({ email });

                    if (user) {
                        if (user.authProvider !== "google") {
                        return res.status(409).json({
                            message:
                            "An account with this email already exists. Please sign in using your password.",
                        });
                        }

                        if (user.googleId && user.googleId !== googleId) {
                        return res.status(409).json({
                            message: "This email is linked to another Google account",
                        });
                        }

                        user.googleId = googleId;
                        user.isVerified = true;
                        await user.save();
                    } else {
                        user = await User.create({
                        fullname,
                        email,
                        role,
                        googleId,
                        authProvider: "google",
                        isVerified: true,
                        });
                    }
                    }

                    const token = jwt.sign(
                    {
                        userId: user._id,
                        role: user.role,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "7d" }
                    );

                    return res.status(200).json({
                    message: "Google authentication successful",
                    token,
                    user: {
                        fullname: user.fullname,
                        email: user.email,
                        role: user.role,
                    },
                    });
        } catch (error) {
                  console.error("Google OAuth error:", error);

                    return res.status(401).json({
                    message: "Google authentication failed",
                    });
                }
                };


   const forgetPassword = async (req,res) => {
     try {
        const {email, otp} = req.body;

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({message: "User Not Found"})
        }

        const Otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

            user.otp = Otp;
            user.otpExpiry = otpExpiry;
            await user.save()
          
       return res.status(200).json({message:"OTP Sent Successfully"}) 
        
     } catch (error) {
        return res.status(400).json({message:"OTP Failed" , error:error.message})
     }
   }


export {signup , login , verifyOtp , GoogleOAuth , forgetPassword} 