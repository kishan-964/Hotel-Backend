import Invoice from "../models/invoice.model.js";
import Booking from "../models/booking.model.js";

export const createInvoice = async (req, res) => {
  try {
    const { invoiceNumber, bookingId, guestId, roomId, lineItems, tax, notes, dueDate } = req.body;

    if (!invoiceNumber || !bookingId || !lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return res.status(400).json({ message: "invoiceNumber, bookingId, and lineItems are required" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const subTotal = lineItems.reduce((sum, item) => sum + (item.amount || 0), 0);
    const total = subTotal + (tax || 0);
    const dueAmount = total;

    const invoice = new Invoice({
      invoiceNumber,
      booking: bookingId,
      guest: guestId,
      room: roomId,
      lineItems,
      subTotal,
      tax: tax || 0,
      total,
      paidAmount: 0,
      dueAmount,
      dueDate,
      notes,
    });

    await invoice.save();
    res.status(201).json({ message: "Invoice created successfully", invoice });
  } catch (error) {
    res.status(500).json({ message: "Error creating invoice", error: error.message });
  }
};

export const getInvoices = async (req, res) => {
  try {
    const filter = {};
    if (req.query.bookingId) filter.booking = req.query.bookingId;
    if (req.query.guestId) filter.guest = req.query.guestId;
    if (req.query.status) filter.status = req.query.status;

    const invoices = await Invoice.find(filter).populate("booking").populate("guest").populate("room");
    res.json({ message: "Invoices fetched successfully", invoices });
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoices", error: error.message });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("booking").populate("guest").populate("room");
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.json({ message: "Invoice found", invoice });
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoice", error: error.message });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.json({ message: "Invoice updated successfully", invoice });
  } catch (error) {
    res.status(500).json({ message: "Error updating invoice", error: error.message });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting invoice", error: error.message });
  }
};