import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";

const validateBookingData = ({ GuestName, GuestEmail, GuestPhone, roomNumber, checkIn, checkOut }) => {
  if (!GuestName || !GuestEmail || !GuestPhone || !roomNumber || !checkIn || !checkOut) {
    throw new Error("Missing required booking fields");
  }
};

const createBookingLogic = async ({
  GuestName,
  GuestEmail,
  GuestPhone,
  roomNumber,
  checkIn,
  checkOut,
  bookingType,
  status
}) => {
  validateBookingData({ GuestName, GuestEmail, GuestPhone, roomNumber, checkIn, checkOut });

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (Number.isNaN(checkInDate.getTime()) || Number.isNaN(checkOutDate.getTime())) {
    throw new Error("Invalid check-in or check-out date");
  }

  if (checkInDate >= checkOutDate) {
    throw new Error("Invalid check-in / check-out dates");
  }

  if (checkInDate < new Date()) {
    throw new Error("Past booking not allowed");
  }

  const roomData = await Room.findOne({ roomNumber });
  if (!roomData) {
    throw new Error("Room not found");
  }

  const existingBooking = await Booking.findOne({
    roomNumber,
    $or: [
      {
        checkIn: { $lt: checkOutDate },
        checkOut: { $gt: checkInDate }
      }
    ]
  });

  if (existingBooking) {
    throw new Error("Room already booked for selected dates");
  }

  const days = Math.max(1, Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)));
  const totalAmount = days * roomData.price;

  const booking = new Booking({
    GuestName,
    GuestEmail,
    GuestPhone,
    roomNumber,
    room: roomData._id,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    totalAmount,
    bookingType,
    status
  });

  await booking.save();
  return booking;
};

export const createOnlineBooking = async (req, res) => {
  try {
    const booking = await createBookingLogic({
      ...req.body,
      bookingType: "online",
      status: "pending"
    });

    res.status(201).json({
      message: "Online booking created, pending payment confirmation",
      booking
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Online booking failed",
      error: error.message || error
    });
  }
};

export const createOfflineBooking = async (req, res) => {
  try {
    const booking = await createBookingLogic({
      ...req.body,
      bookingType: "offline",
      status: "confirmed"
    });

    res.status(201).json({
      message: "Offline booking confirmed",
      booking
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Offline booking failed",
      error: error.message || error
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    const filter = {};
    if (req.query.bookingType) {
      filter.bookingType = req.query.bookingType;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const bookings = await Booking.find(filter).populate("room");

    res.json({
      message: "Bookings fetched successfully",
      bookings
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings",
      error
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("room");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    res.json({
      message: "Booking found",
      booking
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching booking",
      error
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({
      message: "Booking status updated",
      booking
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating booking status",
      error
    });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.bookingType !== "online") {
      return res.status(400).json({ message: "Only online bookings can be payment confirmed" });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Booking is not in pending status" });
    }

    booking.status = "confirmed";
    await booking.save();

    res.json({
      message: "Payment confirmed, booking activated",
      booking
    });
  } catch (error) {
    res.status(500).json({
      message: "Error confirming payment",
      error
    });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      message: "Booking cancelled successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error cancelling booking",
      error
    });
  }
};

