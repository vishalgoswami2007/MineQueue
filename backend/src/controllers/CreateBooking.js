import mongoose from "mongoose";

import { Schedule } from "../modal/ScheduleSchema.js";
import { Booking } from "../modal/BookingSchema.js";

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const CreateBooking = async (req, res) => {
  try {
    const {
      doctorId,
      date,
      time,
    } = req.body;

    const patientId = req.user.userId;

    if (!doctorId || !date || !time) {
      return res.status(400).json({
        message:
          "Doctor, date and time are required",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        doctorId
      )
    ) {
      return res.status(400).json({
        message: "Invalid doctor ID",
      });
    }

    const appointmentDate = new Date(date);

    if (
      Number.isNaN(
        appointmentDate.getTime()
      )
    ) {
      return res.status(400).json({
        message: "Invalid appointment date",
      });
    }

    /*
      Normalize date so the unique index
      compares appointments by calendar day.
    */
    appointmentDate.setHours(
      0,
      0,
      0,
      0
    );

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    if (appointmentDate < today) {
      return res.status(400).json({
        message:
          "Past dates cannot be booked",
      });
    }

    const day =
      dayNames[
        appointmentDate.getDay()
      ];

    /*
      Verify that doctor actually offers
      this slot on selected weekday.
    */
    const schedule =
      await Schedule.findOne({
        doctorId,
        day,
        "slots.time": time,
      });

    if (!schedule) {
      return res.status(404).json({
        message:
          "This slot is not available in doctor's schedule",
      });
    }

    /*
      Optional early check for better UX.
      Database unique index remains the real
      race-condition protection.
    */
    const existingBooking =
      await Booking.findOne({
        doctorId,
        date: appointmentDate,
        slot: time,
        status: {
          $in: [
            "pending",
            "confirmed",
          ],
        },
      });

    if (existingBooking) {
      return res.status(409).json({
        message:
          "Slot is already booked",
      });
    }

    const booking =
      await Booking.create({
        doctorId,
        patientId,
        date: appointmentDate,
        slot: time,
        status: "pending",
      });

    return res.status(201).json({
      message:
        "Appointment booked successfully",
      booking,
    });
  } catch (error) {
    /*
      MongoDB duplicate-key error.
      This handles simultaneous booking
      requests for exactly the same slot.
    */
    if (error?.code === 11000) {
      return res.status(409).json({
        message:
          "This slot was just booked by another patient",
      });
    }

    console.error(
      "Create booking error:",
      error
    );

    return res.status(500).json({
      message:
        "Appointment booking failed",
      error: error.message,
    });
  }
};

export default CreateBooking;