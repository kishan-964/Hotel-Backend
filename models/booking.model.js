import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  GuestName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Phone: {
    type: String,
    required: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room"
  },
  checkIn: Date,
  checkOut: Date,
  totalAmount: Number
}, { timestamps: true });

export default mongoose.model("Booking", BookingSchema);