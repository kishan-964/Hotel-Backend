import express from 'express';
import {
  addReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/reviews", addReview);
router.get("/reviews", getReviews);
router.get("/reviews/:id", getReviewById);
router.patch("/reviews/:id", updateReview);
router.delete("/reviews/:id", deleteReview);

export default router;
