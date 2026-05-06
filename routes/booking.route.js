import express from 'express';
import {
    createOnlineBooking,
    createOfflineBooking,
    getBookings,
    getBookingById,
    updateBookingStatus,
    confirmPayment,
    cancelBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

// Online booking route
router.post("/bookings/online", createOnlineBooking);

// Offline booking route
router.post("/bookings/offline", createOfflineBooking);

// List bookings, optionally filter by type or status
router.get("/bookings", getBookings);

// Get a single booking by ID
router.get("/bookings/:id", getBookingById);

// Update booking status
router.patch("/bookings/:id", updateBookingStatus);

// Confirm payment for online booking
router.patch("/bookings/:id/confirm-payment", confirmPayment);

// Cancel booking
router.delete("/bookings/:id", cancelBooking);

export default router;