import Staff from "../models/staff.model.js";
import { User } from "../models/user.model.js";

export const createStaff = async (req, res) => {
  try {
    const { userId, employeeId, position, department, salary, hireDate, shift, phone, address, emergencyContact } = req.body;

    // Verify user exists and has staff/admin role
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!["staff", "admin"].includes(user.role)) {
      return res.status(400).json({ message: "User must have staff or admin role" });
    }

    // Check if staff profile already exists
    const existingStaff = await Staff.findOne({ user: userId });
    if (existingStaff) {
      return res.status(400).json({ message: "Staff profile already exists for this user" });
    }

    const staff = new Staff({
      user: userId,
      employeeId,
      position,
      department,
      salary,
      hireDate: new Date(hireDate),
      shift,
      phone,
      address,
      emergencyContact,
    });

    await staff.save();
    await staff.populate("user");

    res.status(201).json({ message: "Staff profile created successfully", staff });
  } catch (error) {
    res.status(500).json({ message: "Error creating staff profile", error: error.message });
  }
};

export const getStaff = async (req, res) => {
  try {
    const filter = {};
    if (req.query.department) filter.department = req.query.department;
    if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === "true";

    const staff = await Staff.find(filter).populate("user");
    res.json({ message: "Staff fetched successfully", staff });
  } catch (error) {
    res.status(500).json({ message: "Error fetching staff", error: error.message });
  }
};

export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).populate("user");
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.json({ message: "Staff found", staff });
  } catch (error) {
    res.status(500).json({ message: "Error fetching staff", error: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("user");

    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.json({ message: "Staff updated successfully", staff });
  } catch (error) {
    res.status(500).json({ message: "Error updating staff", error: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }
    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting staff", error: error.message });
  }
};