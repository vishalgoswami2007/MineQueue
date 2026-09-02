import cloudinary from '../config/cloudinary.js';
import { User } from '../models/UserSchema.js';
import fs from 'fs';

const uploadDocument = async (req, res) => {
   try {
      const userId = req.user.userId;

      const result = await cloudinary.uploader.upload(req.file.path);

      fs.unlinkSync(req.file.path);

      const updatedUser = await User.findByIdAndUpdate(
         userId,
         { documents: result.secure_url },
         { new: true }
      );

      return res.status(200).json({ message: "Document uploaded successfully", user: updatedUser });

   } catch (error) {
      return res.status(500).json({ message: "Upload failed", error: error.message });
   }
}

export { uploadDocument };