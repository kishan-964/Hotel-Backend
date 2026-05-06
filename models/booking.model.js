import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    GuestName: {
      type: String,
      required: [true, "Guest name is required"],
      trim: true,
    },
    GuestEmail: {
      type: String,
      required: [true, "Guest email is required"],
      trim: true,
      lowercase: true,
    },
    GuestPhone: {
      type: String,
      required: [true, "Guest phone is required"],
      trim: true,
    },
    roomNumber: {
      type: String,
      required: [true, "Room number is required"],
      trim: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    checkIn: {
      type: Date,
      required: [true, "Check-in date is required"],
    },
    checkOut: {
      type: Date,
      required: [true, "Check-out date is required"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },
    bookingType: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    specialRequests: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Booking", BookingSchema);