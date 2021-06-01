import express from "express";
import {
  getCountries,
  getCountryDateCovidStatistics,
  getCountryCumulativeCovidStatistics,
  getCountryDailyCovidStatistics,
  getCountryDateVaccineStatistics,
  getCountryCumulativeVaccineStatistics,
  getCountryDailyVaccineStatistics,
} from "../controllers/country.js";

const router = express.Router();

router.get("/", getCountries);
router.get("/:country/covid/date", getCountryDateCovidStatistics);
router.get("/:country/covid/cumulative", getCountryCumulativeCovidStatistics);
router.get("/:country/covid/daily", getCountryDailyCovidStatistics);

router.get("/:country/vaccine/date", getCountryDateVaccineStatistics);
router.get(
  "/:country/vaccine/cumulative",
  getCountryCumulativeVaccineStatistics
);
router.get("/:country/vaccine/daily", getCountryDailyVaccineStatistics);

export default router;
