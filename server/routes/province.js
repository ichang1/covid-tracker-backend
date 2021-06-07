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
router.get("/:province/covid-19/date", getStateDateCovidStatistics);
router.get("/:province/covid-19/cumulative", getStateCumulativeCovidStatistics);
router.get("/:province/covid-19/daily", getStateDailyCovidStatistics);

router.get("/:province/vaccine/date", getStateDateVaccineStatistics);
router.get(
  "/:province/vaccine/cumulative",
  getStateCumulativeVaccineStatistics
);
router.get("/:province/vaccine/daily", getStateDailyVaccineStatistics);

export default router;
