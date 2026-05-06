import Review from "../models/review.model.js";

export const addReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Error adding review", error: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const filter = {};
    if (req.query.guestId) filter.guest = req.query.guestId;
    if (req.query.bookingId) filter.booking = req.query.bookingId;
    if (req.query.roomId) filter.room = req.query.roomId;
    if (req.query.status) filter.status = req.query.status;

    const reviews = await Review.find(filter).populate("guest").populate("booking").populate("room");
    res.json({ message: "Reviews fetched successfully", reviews });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate("guest").populate("booking").populate("room");
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review found", review });
  } catch (error) {
    res.status(500).json({ message: "Error fetching review", error: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error: error.message });
  }
};