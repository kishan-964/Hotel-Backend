import { Contact } from "../models/contact.model.js";

// Get all messages
// Create a new message
// Delete a message
// Update message status

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (contacts.length === 0) {
      return res.status(404).json({ message: "No contacts found" });
    }

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching contacts",
    });
  }
};

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    res.status(201).json({
      message: "Contact created successfully",
      contact: newContact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating contact",
    });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const existingContact = await Contact.findById(id);

    if (!existingContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    if (status === "pending" || status === "resolved") {
      existingContact.status = status;
    }

    await existingContact.save();

    res.status(200).json({
      message: "Contact status updated successfully",
      contact: existingContact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating contact status",
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const existingContact = await Contact.findById(id);

    if (!existingContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    await Contact.findByIdAndDelete(id);

    res.status(200).json({
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting contact",
    });
  }
};
