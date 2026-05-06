import Facility from "../models/facility.model.js";

export const addFacility = async (req, res) => {
  try {
    const facility = new Facility(req.body);
    await facility.save();
    res.status(201).json({ message: "Facility added successfully", facility });
  } catch (error) {
    res.status(500).json({ message: "Error adding facility", error: error.message });
  }
};

export const getFacilities = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.available) filter.available = req.query.available === "true";

    const facilities = await Facility.find(filter);
    res.json({ message: "Facilities fetched successfully", facilities });
  } catch (error) {
    res.status(500).json({ message: "Error fetching facilities", error: error.message });
  }
};

export const getFacilityById = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }
    res.json({ message: "Facility found", facility });
  } catch (error) {
    res.status(500).json({ message: "Error fetching facility", error: error.message });
  }
};

export const updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }
    res.json({ message: "Facility updated successfully", facility });
  } catch (error) {
    res.status(500).json({ message: "Error updating facility", error: error.message });
  }
};

export const deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: "Facility not found" });
    }
    res.json({ message: "Facility deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting facility", error: error.message });
  }
};