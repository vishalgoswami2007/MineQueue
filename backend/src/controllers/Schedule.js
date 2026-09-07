import { Schedule } from "../modal/ScheduleSchema.js";

const validDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const createSchedule = async (req, res) => {
  try {
    const { day, slots } = req.body;

    const doctorId = req.user.userId;

    if (!day || !validDays.includes(day)) {
      return res.status(400).json({
        message: "Please provide a valid day",
      });
    }

    if (!Array.isArray(slots) || slots.length === 0) {
      return res.status(400).json({
        message: "At least one time slot is required",
      });
    }

    const cleanedSlots = slots
      .filter(
        (slot) =>
          slot &&
          typeof slot.time === "string" &&
          slot.time.trim()
      )
      .map((slot) => ({
        time: slot.time.trim(),
        isBooked: false,
      }));

    if (cleanedSlots.length === 0) {
      return res.status(400).json({
        message: "Please provide valid time slots",
      });
    }

    const uniqueTimes = new Set(
      cleanedSlots.map((slot) => slot.time)
    );

    if (uniqueTimes.size !== cleanedSlots.length) {
      return res.status(400).json({
        message: "Duplicate time slots are not allowed",
      });
    }

    const existingSchedule = await Schedule.findOne({
      doctorId,
      day,
    });

    let schedule;

    if (existingSchedule) {
      const bookedSlots = existingSchedule.slots.filter(
        (slot) => slot.isBooked
      );

      const bookedTimes = new Set(
        bookedSlots.map((slot) => slot.time)
      );

      const availableSlots = cleanedSlots.filter(
        (slot) => !bookedTimes.has(slot.time)
      );

      schedule = await Schedule.findByIdAndUpdate(
        existingSchedule._id,
        {
          $set: {
            slots: [
              ...bookedSlots,
              ...availableSlots,
            ],
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(200).json({
        message: "Schedule Updated Successfully",
        schedule,
      });
    }

    schedule = await Schedule.create({
      doctorId,
      day,
      slots: cleanedSlots,
    });

    return res.status(201).json({
      message: "Schedule Created Successfully",
      schedule,
    });
  } catch (error) {
    console.error(
      "Create schedule error:",
      error
    );

    return res.status(500).json({
      message: "Schedule Creation Failed",
      error: error.message,
    });
  }
};

const getDoctorSchedule = async (req, res) => {
  try {
    const { doctorId } = req.params;

    if (!doctorId) {
      return res.status(400).json({
        message: "Doctor ID is required",
      });
    }

    const schedules = await Schedule.find({
      doctorId,
    }).sort({
      createdAt: 1,
    });

    return res.status(200).json({
      message: "Doctor Schedule Fetched Successfully",
      schedules,
    });
  } catch (error) {
    console.error(
      "Get doctor schedule error:",
      error
    );

    return res.status(500).json({
      message: "Unable to fetch doctor schedule",
      error: error.message,
    });
  }
};

const getMySchedule = async (req, res) => {
  try {
    const doctorId = req.user.userId;

    const schedules = await Schedule.find({
      doctorId,
    }).sort({
      createdAt: 1,
    });

    return res.status(200).json({
      message: "Schedule Fetched Successfully",
      schedules,
    });
  } catch (error) {
    console.error(
      "Get my schedule error:",
      error
    );

    return res.status(500).json({
      message: "Unable to fetch schedule",
      error: error.message,
    });
  }
};

export {
  createSchedule,
  getDoctorSchedule,
  getMySchedule,
};