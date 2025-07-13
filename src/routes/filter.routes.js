import { Router } from "express";
import {
  searchStores,
  filterStores,
  filterUsers,
} from "../controllers/filters.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/filterStores", authenticate, authorize("admin"), filterStores);
router.get("/filterUsers", authenticate, authorize("admin"), filterUsers);
router.get("/searchStores", authenticate, authorize("admin"), searchStores);

export default router;
