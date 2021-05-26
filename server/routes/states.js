import express from "express";
import {
  getStates,
  getStateDateStatistics,
  getStateCumulativeStatistics,
  getStateDailyStatistics,
} from "../controllers/states.js";

const router = express.Router();

router.get("/", getStates);
router.get("/:state/:date", getStateDateStatistics);
router.get("/:state/cumulative/:dateRange", getStateCumulativeStatistics);
router.get("/:state/daily/:dateRange", getStateDailyStatistics);

export default router;
