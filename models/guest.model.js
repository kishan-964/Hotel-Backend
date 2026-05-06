import mongoose from "mongoose";

const guestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Guest name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Guest email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Guest phone is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Guest address is required"],
      trim: true,
    },
    idProof: {
      type: String,
      required: [true, "ID proof is required"],
      trim: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    checkIn: {
      type: Date,
    },
    checkOut: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Guest", guestSchema);