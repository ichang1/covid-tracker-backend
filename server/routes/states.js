import express from "express";
import {
  getStates,
  getStateDateStatistics,
  getStateCumulativeStatistics,
  getStateDailyStatistics,
} from "../controllers/states.js";

const router = express.Router();

router.get("/", getStates);
router.get("/:state/date/:date", getStateDateStatistics);
router.get("/:state/cumulative", getStateCumulativeStatistics);
router.get("/:state/daily", getStateDailyStatistics);

export default router;
