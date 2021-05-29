import express from "express";
import {
  getCountries,
  getCountryDateStatistics,
  getCountryCumulativeStatistics,
  getCountryDailyStatistics,
} from "../controllers/country.js";

const router = express.Router();

router.get("/", getCountries);
router.get("/:country/date", getCountryDateStatistics);
router.get("/:country/cumulative", getCountryCumulativeStatistics);
router.get("/:country/daily", getCountryDailyStatistics);

export default router;
