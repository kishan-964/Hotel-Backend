import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Facility name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["pool", "gym", "spa", "restaurant", "conference", "parking", "housekeeping", "other"],
      default: "other",
    },
    available: {
      type: Boolean,
      default: true,
    },
    location: {
      type: String,
      trim: true,
    },
    openingHours: {
      type: String,
      trim: true,
    },
    capacity: {
      type: Number,
      min: [0, "Capacity cannot be negative"],
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Facility", facilitySchema);
