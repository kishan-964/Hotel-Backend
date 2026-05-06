import Service from "../models/service.model.js";

export const addService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json({ message: "Service added successfully", service });
  } catch (error) {
    res.status(500).json({ message: "Error adding service", error: error.message });
  }
};

export const getServices = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.available) filter.available = req.query.available === "true";

    const services = await Service.find(filter).populate("booking").populate("guest");
    res.json({ message: "Services fetched successfully", services });
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("booking").populate("guest");
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: "Service found", service });
  } catch (error) {
    res.status(500).json({ message: "Error fetching service", error: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: "Service updated successfully", service });
  } catch (error) {
    res.status(500).json({ message: "Error updating service", error: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service", error: error.message });
  }
};