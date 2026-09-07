const getDoctorById = async (req, res) => {
   try {
      const { doctorId } = req.params;

      const doctor = await User.findById(doctorId).select("-password -otp -otpExpiry");

      if (!doctor) {
         return res.status(404).json({ message: "Doctor not found" });
      }

      return res.status(200).json({ message: "Doctor fetched successfully", doctor });

   } catch (error) {
      return res.status(500).json({ message: "Failed to fetch doctor", error: error.message });
   }
}