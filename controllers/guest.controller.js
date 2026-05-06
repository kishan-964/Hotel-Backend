import Guest from "../models/guest.model.js";

// Add Guest
export const addGuest = async (req, res) => {
  try {
    const guest = new Guest(req.body);
    await guest.save();
    res.status(201).json({
      message: "Guest added successfully",
      guest
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding guest",
      error
    });
  }
};

// GET ALL GUESTS
export const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json({
      message: "Guests fetched successfully",
      guests
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching guests",
      error
    });
  }
};

// GET GUEST BY ID
export const getGuestById = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).json({
        message: "Guest not found"
      });
    }
    res.json({
      message: "Guest found",
      guest
    });
  } catch (error) {
    res.status(500).json({
      message: "Error finding guest",
      error
    });
  }
};

// UPDATE GUEST
export const updateGuest = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!guest) {
      return res.status(404).json({
        message: "Guest not found"
      });
    }
    res.json({
      message: "Guest updated successfully",
      guest
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating guest",
      error
    });
  }
};

// DELETE GUEST
export const deleteGuest = async (req, res) => {
  try {
    const guest = await Guest.findByIdAndDelete(req.params.id);
    if (!guest) {
      return res.status(404).json({
        message: "Guest not found"
      });
    }
    res.json({
      message: "Guest deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting guest",
      error
    });
  }
};

            
        

            