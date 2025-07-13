import { Router } from "express";
import {
  submitRating,
  getUserRating,
  updateRating,
} from "../controllers/rating.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/submitRating", authenticate, authorize("user"), submitRating);
router.post("/updateRating", authenticate, authorize("user"), updateRating);
router.get("/getUserRating", getUserRating);

export default router;
