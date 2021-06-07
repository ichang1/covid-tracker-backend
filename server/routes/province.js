import express from "express";
import {
  getProvinces,
  getDateProvinceStatistics,
  getProvinceCumulativeCovidStatistics,
  getProvinceDailyCovidStatistics,
  getProvinceDateVaccineStatistics,
  getProvinceCumulativeVaccineStatistics,
  getProvinceDailyVaccineStatistics,
} from "../controllers/province.js";

const router = express.Router();

router.get("/", getProvinces);
router.get("/:province/covid-19/date", getDateProvinceStatistics);
router.get(
  "/:province/covid-19/cumulative",
  getProvinceCumulativeCovidStatistics
);
router.get("/:province/covid-19/daily", getProvinceDailyCovidStatistics);

router.get("/:province/vaccine/date", getProvinceDateVaccineStatistics);
router.get(
  "/:province/vaccine/cumulative",
  getProvinceCumulativeVaccineStatistics
);
router.get("/:province/vaccine/daily", getProvinceDailyVaccineStatistics);

export default router;
