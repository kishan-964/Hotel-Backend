import express from 'express';
import {
  addGuest,
  getGuests,
  getGuestById,
  updateGuest,
  deleteGuest,
} from "../controllers/guest.controller.js";

const router = express.Router();

router.post("/guests", addGuest);
router.get("/guests", getGuests);
router.get("/guests/:id", getGuestById);
router.patch("/guests/:id", updateGuest);
router.delete("/guests/:id", deleteGuest);

export default router;
