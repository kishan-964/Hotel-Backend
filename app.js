import express from "express";
import cors from "cors";
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
import { authorization } from "./middlewares/auth.middleware.js";

configDotenv();


const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    
}))

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



export default app;