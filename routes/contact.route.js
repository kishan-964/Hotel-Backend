import express from 'express';
import {
  createContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/contacts", createContact);
router.get("/contacts", getContacts);
router.get("/contacts/:id", getContactById);
router.patch("/contacts/:id", updateContactStatus);
router.delete("/contacts/:id", deleteContact);

export default router;