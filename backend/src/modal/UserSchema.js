import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

     fullname: {
        type: String,
        required: true,
        trim: true
     },
     email: {
        type: String,
        required: [true, 'Email Address is Required'],
        lowercase: true,
        trim: true,
        unique: true
     },
     password: {
        type: String,
        required: function() {
               return this.authProvider === 'local';
        }
     },
     role: {
        type: String,
        required: true,
        enum: ["Doctor", "Patient"]
     },
     authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
     },
     googleId: {
        type: String
     },
     isVerified: {
        type: Boolean,
        default: false
     },
     otp: {
        type: String
     },
     otpExpiry: {
        type: Date
     },

     // Doctor-specific fields
     specialization: {
        type: String
     },
     hospital: {
        type: String
     },
     documents: {
        type: String
     },
     isDoctorVerified: {
        type: Boolean,
        default: false
     }

}, { timestamps: true })

export const User = mongoose.model('User', UserSchema);