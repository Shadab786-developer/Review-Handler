import { Router } from "express";
import {
  register,
  login,
  getAllUsers,
  getUserById,
  createUserByAdmin,
  updatePassword,
} from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getAllUsers", authenticate, authorize("admin"), getAllUsers);
router.get("/getUserById/:id", authenticate, authorize("admin"), getUserById);
router.post(
  "/createUserByAdmin",
  authenticate,
  authorize("admin"),
  createUserByAdmin
);
router.post("/updatePassword", updatePassword);

export default router;
