import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    day: {
      type: String,
      required: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },

    slots: [
      {
        time: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// One schedule per doctor per weekday
ScheduleSchema.index(
  {
    doctorId: 1,
    day: 1,
  },
  {
    unique: true,
  }
);

export const Schedule = mongoose.model(
  "Schedule",
  ScheduleSchema
);