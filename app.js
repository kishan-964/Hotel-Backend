import express from "express";
import cors from "cors";
import morgan from "morgan";
import { configDotenv } from "dotenv";

// Routes
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import bookingRoutes from "./routes/booking.route.js";
import guestRoutes from "./routes/guest.route.js";
import paymentRoutes from "./routes/payment.route.js";
import serviceRoutes from "./routes/service.route.js";
import invoiceRoutes from "./routes/invoice.route.js";
import reviewRoutes from "./routes/review.route.js";
import facilityRoutes from "./routes/facility.route.js";
import contactRoutes from "./routes/contact.route.js";
import staffRoutes from "./routes/staff.route.js";

// Middleware
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";

configDotenv();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/health", (req, res) => {
  res.json({ message: "Server is running", timestamp: new Date() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", bookingRoutes);
app.use("/api", guestRoutes);
app.use("/api", paymentRoutes);
app.use("/api", serviceRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", reviewRoutes);
app.use("/api", facilityRoutes);
app.use("/api", contactRoutes);
app.use("/api", staffRoutes);

// 404 Not Found handler
app.use(notFoundHandler);

// Global Error Handler (must be last)
app.use(errorHandler);

export default app;