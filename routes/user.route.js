import express from 'express';
import {
    deleteProfile,
    getUsers,
    getProfile,
    updateProfile,
} from "../controllers/user.controller.js";
import { authorization } from "../middlewares/auth.middleware.js";       

const router = express.Router();

router.get("/users", getUsers);
router.get("/profile", authorization, getProfile);
router.patch("/profile", authorization, updateProfile);
router.delete("/profile", authorization, deleteProfile);

export default router;