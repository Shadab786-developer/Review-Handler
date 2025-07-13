import { Router } from "express";
import {
  getAverageRating,
  createStore,
  getStoreRatings,
  getAllStores,
} from "../controllers/store.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
const router = Router();

router.get(
  "/getAllStores",
  authenticate,
  authorize("admin", "owner"),
  getAllStores
);
router.get(
  "/getStoreRatings",
  authenticate,
  authorize("admin", "owner"),
  getStoreRatings
);
router.get(
  "/getAverageRating",
  authenticate,
  authorize("admin"),
  getAverageRating
);
router.post("/createStore", createStore);

export default router;
