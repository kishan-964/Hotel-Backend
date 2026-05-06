import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "This-is-my-jwt-secret-key";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "This-is-my-jwt-refresh-key";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "staff"
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const payload = {
      userId: user._id,
      role: user.role,
      name: user.name
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const payload = {
      userId: decoded.userId,
      role: decoded.role,
      name: decoded.name
    };

    const newAccessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    const newRefreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid refresh token" });
  }
};