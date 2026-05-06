import Payment from "../models/payment.model.js";
import Booking from "../models/booking.model.js";

export const createPayment = async (req, res) => {
  try {
    const { bookingId, guestId, amount, paymentMethod, transactionId, paidAt, notes } = req.body;

    if (!bookingId || amount == null || !paymentMethod) {
      return res.status(400).json({ message: "bookingId, amount, and paymentMethod are required" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const payment = new Payment({
      booking: bookingId,
      guest: guestId,
      amount,
      paymentMethod,
      paymentStatus: amount > 0 ? "paid" : "pending",
      transactionId,
      paidAt: paidAt ? new Date(paidAt) : new Date(),
      notes,
    });

    await payment.save();

    res.status(201).json({ message: "Payment recorded successfully", payment });
  } catch (error) {
    res.status(500).json({ message: "Error creating payment", error: error.message });
  }
};

export const getPayments = async (req, res) => {
  try {
    const filter = {};
    if (req.query.bookingId) filter.booking = req.query.bookingId;
    if (req.query.guestId) filter.guest = req.query.guestId;
    if (req.query.paymentStatus) filter.paymentStatus = req.query.paymentStatus;

    const payments = await Payment.find(filter).populate("booking").populate("guest");
    res.json({ message: "Payments fetched successfully", payments });
  } catch (error) {
    res.status(500).json({ message: "Error fetching payments", error: error.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("booking").populate("guest");
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json({ message: "Payment found", payment });
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment", error: error.message });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const { paymentStatus, transactionId, paidAt, notes } = req.body;
    if (paymentStatus) payment.paymentStatus = paymentStatus;
    if (transactionId) payment.transactionId = transactionId;
    if (paidAt) payment.paidAt = new Date(paidAt);
    if (notes) payment.notes = notes;

    await payment.save();
    res.json({ message: "Payment updated successfully", payment });
  } catch (error) {
    res.status(500).json({ message: "Error updating payment", error: error.message });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting payment", error: error.message });
  }
};