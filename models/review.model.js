import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
      required: [true, "Guest reference is required"],
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot be more than 5"],
    },
    comment: {
      type: String,
      trim: true,
    },
    serviceQuality: {
      type: Number,
      min: [1, "Service quality rating must be at least 1"],
      max: [5, "Service quality rating cannot be more than 5"],
    },
    cleanliness: {
      type: Number,
      min: [1, "Cleanliness rating must be at least 1"],
      max: [5, "Cleanliness rating cannot be more than 5"],
    },
    value: {
      type: Number,
      min: [1, "Value rating must be at least 1"],
      max: [5, "Value rating cannot be more than 5"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reply: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Review", reviewSchema);
