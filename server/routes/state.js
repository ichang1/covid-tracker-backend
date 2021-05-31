import express from "express";
import {
  getStates,
  getStateDateCovidStatistics,
  getStateCumulativeCovidStatistics,
  getStateDailyCovidStatistics,
  getStateDateVaccineStatistics,
  getStateCumulativeVaccineStatistics,
  getStateDailyVaccineStatistics,
} from "../controllers/state.js";

const router = express.Router();

router.get("/", getStates);
router.get("/:state/covid/date", getStateDateCovidStatistics);
router.get("/:state/covid/cumulative", getStateCumulativeCovidStatistics);
router.get("/:state/covid/daily", getStateDailyCovidStatistics);

router.get("/:state/vaccine/date", getStateDateVaccineStatistics);
router.get("/:state/vaccine/cumulative", getStateCumulativeVaccineStatistics);
router.get("/:state/vaccine/daily", getStateDailyVaccineStatistics);

export default router;
