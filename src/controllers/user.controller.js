import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = asyncHandler(async (req, res) => {
  try {
    // validate inputs here
    const { name, email, address, password, role = "user" } = req.body;
    console.log(req.body);

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, address, password: hashed, role });
    console.log(user);

    await user.save();
    res.status(201).json({ message: "User registered" });
    return res
      .status(201)
      .json(new ApiResponse(201, user, "User registered successfully"));
  } catch (error) {
    console.log("User Creation failed:", error);
    throw new ApiError(500, "User registration failed ");
  }
});
const login = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { token, role: user.role },
          "User logged in successfully"
        )
      );
  } catch (error) {
    console.log("Login failed:", error);
    throw new ApiError(500, "Login failed");
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const filters = req.query;
    const users = await User.find(filters);
    res.json(users);
    return res
      .status(200)
      .json(new ApiResponse(200, { users }, "User get successfully"));
  } catch (error) {
    console.log("Getting user information failed:", error);
    throw new ApiError(500, "Getting user information failed");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    return res
      .status(200)
      .json(new ApiResponse(200, { user }, "User get by ID successfully"));
  } catch (error) {
    console.log("Getting user information by Id failed:", error);
    throw new ApiError(500, "Getting user information by Id failed");
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params; // from middleware
    const { newPassword } = req.body;
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashed });
    return res.status(200).json(new ApiResponse(200, "Password updated"));
  } catch (error) {
    console.log(" Password updated failed:", error);
    throw new ApiError(500, "Password updated  failed");
  }
});
const createUserByAdmin = asyncHandler(async (req, res) => {
  try {
    const { name, email, address, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, address, password: hashed, role });
    await user.save();
    res.status(201).json(user);
    return res
      .status(200)
      .json(
        new ApiResponse(200, { user }, "User Created By Admin successfully")
      );
  } catch (error) {
    console.log("User Created By Admin failed:", error);
    throw new ApiError(500, "User Created By Admin failed");
  }
});

export {
  register,
  login,
  getAllUsers,
  getUserById,
  createUserByAdmin,
  updatePassword,
};
