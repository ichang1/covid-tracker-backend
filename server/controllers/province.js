import axios from "axios";
import { provincesCovid } from "../places/province.js";
import {
  isValidDate,
  dateToNumber,
  getTodayDate,
  dateToYesterday,
  validateDateRange,
} from "../utils/date.js";
import {} from "../utils/parseProvince.js";

export function getProvinces(req, res) {
  const provinces = { provinces: Object.keys(provincesCovid) };
  res.status(200).json(provinces);
}
