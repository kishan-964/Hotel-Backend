import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  GuestName: {
    type: String,
    required: true
  },
  GuestEmail: {
    type: String,
    required: true
  },
  GuestPhone: {
    type: String,
    required: true
  },
  roomNumber: {
    type: String,
    required: true
  },
  checkIn: Date,
  checkOut: Date,
  totalAmount: Number
}, { timestamps: true });

export default mongoose.model("Booking", BookingSchema);