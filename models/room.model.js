import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, "Room number is required"],
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Room type is required"],
      enum: ["single", "double", "suite", "deluxe", "family"],
      default: "single",
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Room price is required"],
      min: [0, "Price cannot be negative"],
    },
    capacity: {
      type: Number,
      required: [true, "Room capacity is required"],
      min: [1, "Capacity must be at least 1"],
      default: 1,
    },
    amenities: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["available", "booked", "maintenance"],
      default: "available",
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Room", roomSchema);