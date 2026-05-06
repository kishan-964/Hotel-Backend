import express from 'express';
import {
  createPayment,
  getPayments,
  getPaymentById,
  updatePaymentStatus,
  deletePayment,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/payments", createPayment);
router.get("/payments", getPayments);
router.get("/payments/:id", getPaymentById);
router.patch("/payments/:id", updatePaymentStatus);
router.delete("/payments/:id", deletePayment);

export default router;
