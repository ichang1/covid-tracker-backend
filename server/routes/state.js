import express from "express";
import {
  getStates,
  getStateDateCovidStatistics,
  getStateCumulativeCovidStatistics,
  getStateDailyCovidStatistics,
} from "../controllers/state.js";

const router = express.Router();

router.get("/", getStates);
router.get("/:state/covid/date", getStateDateCovidStatistics);
router.get("/:state/covid/cumulative", getStateCumulativeCovidStatistics);
router.get("/:state/covid/daily", getStateDailyCovidStatistics);

export default router;
