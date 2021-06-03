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
router.get("/:state/covid-19/date", getStateDateCovidStatistics);
router.get("/:state/covid-19/cumulative", getStateCumulativeCovidStatistics);
router.get("/:state/covid-19/daily", getStateDailyCovidStatistics);

router.get("/:state/vaccine/date", getStateDateVaccineStatistics);
router.get("/:state/vaccine/cumulative", getStateCumulativeVaccineStatistics);
router.get("/:state/vaccine/daily", getStateDailyVaccineStatistics);

export default router;
