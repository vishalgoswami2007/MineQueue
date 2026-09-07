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
        message: "At least one slot is required",
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
      }));

    if (cleanedSlots.length === 0) {
      return res.status(400).json({
        message: "Please provide valid slots",
      });
    }

    const uniqueTimes = [
      ...new Set(cleanedSlots.map((slot) => slot.time)),
    ];

    if (uniqueTimes.length !== cleanedSlots.length) {
      return res.status(400).json({
        message: "Duplicate slots are not allowed",
      });
    }

    const schedule = await Schedule.findOneAndUpdate(
      {
        doctorId,
        day,
      },
      {
        $set: {
          slots: cleanedSlots,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      message: "Schedule saved successfully",
      schedule,
    });
  } catch (error) {
    console.error("Create schedule error:", error);

    if (error?.code === 11000) {
      return res.status(409).json({
        message: "Schedule already exists for this day",
      });
    }

    return res.status(500).json({
      message: "Failed to save schedule",
      error: error.message,
    });
  }
};

const getMySchedule = async (req, res) => {
  try {
    const doctorId = req.user.userId;

    const schedules = await Schedule.find({
      doctorId,
    });

    const sortedSchedules = schedules.sort(
      (a, b) =>
        validDays.indexOf(a.day) -
        validDays.indexOf(b.day)
    );

    return res.status(200).json({
      message: "Schedule fetched successfully",
      schedules: sortedSchedules,
    });
  } catch (error) {
    console.error("Get my schedule error:", error);

    return res.status(500).json({
      message: "Failed to fetch schedule",
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
    });

    const sortedSchedules = schedules.sort(
      (a, b) =>
        validDays.indexOf(a.day) -
        validDays.indexOf(b.day)
    );

    return res.status(200).json({
      message: "Doctor schedule fetched successfully",
      schedules: sortedSchedules,
    });
  } catch (error) {
    console.error("Get doctor schedule error:", error);

    return res.status(500).json({
      message: "Failed to fetch doctor schedule",
      error: error.message,
    });
  }
};

export {
  createSchedule,
  getMySchedule,
  getDoctorSchedule,
};