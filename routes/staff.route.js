import express from 'express';
import {
  createStaff,
  getStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
} from "../controllers/staff.controller.js";
import { authorization, requireRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All staff routes require authentication
router.use(authorization);

// Create staff profile (admin only)
router.post("/staff", requireRole(["admin"]), createStaff);

// Get all staff (admin and staff)
router.get("/staff", requireRole(["admin", "staff"]), getStaff);

// Get staff by ID (admin and staff)
router.get("/staff/:id", requireRole(["admin", "staff"]), getStaffById);

// Update staff (admin only)
router.patch("/staff/:id", requireRole(["admin"]), updateStaff);

// Delete staff (admin only)
router.delete("/staff/:id", requireRole(["admin"]), deleteStaff);

export default router;