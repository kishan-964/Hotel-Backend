import express from 'express';
import {
  addFacility,
  getFacilities,
  getFacilityById,
  updateFacility,
  deleteFacility,
} from "../controllers/facility.controller.js";

const router = express.Router();

router.post("/facilities", addFacility);
router.get("/facilities", getFacilities);
router.get("/facilities/:id", getFacilityById);
router.patch("/facilities/:id", updateFacility);
router.delete("/facilities/:id", deleteFacility);

export default router;
