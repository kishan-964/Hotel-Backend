import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["food", "laundry", "spa", "transport", "housekeeping", "other"],
      default: "other",
    },
    price: {
      type: Number,
      required: [true, "Service price is required"],
      min: [0, "Price cannot be negative"],
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
    },
    available: {
      type: Boolean,
      default: true,
    },
    taxRate: {
      type: Number,
      min: [0, "Tax rate cannot be negative"],
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Service", serviceSchema);