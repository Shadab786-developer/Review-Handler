import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

const authenticate = asyncHandler((req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
});

const authorize =
  (...role) =>
  (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };

export { authenticate, authorize };
