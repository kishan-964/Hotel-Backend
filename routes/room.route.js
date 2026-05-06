import express from 'express';
import {
    addRoom,
    getRooms,
    getRoomByNumber,
    updateRoom,
    deleteRoom,
} from "../controllers/room.controller.js";

const router = express.Router();

router.post("/rooms", addRoom);
router.get("/rooms", getRooms);
router.get("/rooms/:roomNumber", getRoomByNumber);
router.patch("/rooms/:roomNumber", updateRoom);
router.delete("/rooms/:roomNumber", deleteRoom);

export default router;
