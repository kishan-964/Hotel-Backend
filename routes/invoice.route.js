import express from 'express';
import {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoice.controller.js";

const router = express.Router();

router.post("/invoices", createInvoice);
router.get("/invoices", getInvoices);
router.get("/invoices/:id", getInvoiceById);
router.patch("/invoices/:id", updateInvoice);
router.delete("/invoices/:id", deleteInvoice);

export default router;
