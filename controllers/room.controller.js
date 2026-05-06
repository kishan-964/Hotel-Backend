import Room from "../models/room.model.js";

//  Add Room
export const addRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();

    res.status(201).json({
      message: "Room added successfully ",
      room,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding room ",
      error,
    });
  }
};

//  Get All Rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.json({
      message: "Rooms fetched successfully ",
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching rooms ",
      error,
    });
  }
};

//  Get Room by Room Number
export const getRoomByNumber = async (req, res) => {
  try {
    const { roomNumber } = req.params;

    const room = await Room.findOne({ roomNumber });

    if (!room) {
      return res.status(404).json({
        message: "Room not found "
      });
    }

    res.json({
      message: "Room found ",
      room,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error finding room ",
      error,
    });
  }
};