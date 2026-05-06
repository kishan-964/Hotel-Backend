import express from 'express';
import {
  addService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";

const router = express.Router();

router.post("/services", addService);
router.get("/services", getServices);
router.get("/services/:id", getServiceById);
router.patch("/services/:id", updateService);
router.delete("/services/:id", deleteService);

export default router;
