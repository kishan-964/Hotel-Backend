import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const {
      GuestName,
      GuestEmail,
      GuestPhone,
      roomNumber,
      checkIn,
      checkOut
    } = req.body;

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // invalid date
    if (checkInDate >= checkOutDate) {
      return res.status(400).json({
        message: "Invalid check-in / check-out dates "
      });
    }

    // past date block
    if (checkInDate < new Date()) {
      return res.status(400).json({
        message: "Past booking not allowed "
      });
    }

    //  check Dubble booking
    const existingBooking = await Booking.findOne({
      roomNumber: roomNumber,
      $or: [
        {
          checkIn: { $lt: checkOutDate },
          checkOut: { $gt: checkInDate }
        }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "Room already booked for selected dates "
      });
    }

    //  auto price calculate
    const roomData = await Room.findById(room);
    const days =
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

    const totalAmount = days * roomData.price;

    //  create booking
    const booking = new Booking({
      GuestName,
      GuestEmail,
      GuestPhone,
      roomNumber,
      checkIn,
      checkOut,
      totalAmount
    });

    await booking.save();

    res.status(201).json({
      message: "Booking successful ",
      booking
    });

  } catch (error) {
    res.status(500).json({
      message: "Booking failed ",
      error
    });
  }
};

//  GET ALL BOOKINGS
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("room");

    res.json({
      message: "Bookings fetched ",
      bookings
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings ",
      error
    });
  }
};

//  GET SINGLE BOOKING
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("room");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found "
      });
    }

    res.json({
      message: "Booking found ",
      booking
    });
  } catch (error) {
    res.status(500).json({
      message: "Error ",
      error
    });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (
      status !== "pending" &&
      status !== "confirmed" &&
      status !== "cancelled"
    ) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({
      message: "Error updating booking status",
    });
  }
};

//  CANCEL BOOKING
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found "
      });
    }

    res.json({
      message: "Booking cancelled "
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting booking ",
      error
    });
  }
};

